import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { auth } from './helpers/firebaseConfig'
import { User, UserManager } from '@/models/User'

Vue.config.productionTip = false

Vue.use(Vuetify)

function requiredAuth (to, from, next) {
  console.log('%croute', `background: blue; color: white; padding: 2px 0.5em; border-radius: 0.5em;`, from.path + ' => ' + to.path)

  if (
    store.getters.user == null &&
    to.matched.some(route => route.meta.secured === true)
  ) {
    // Cancel this routing and replace with unlogged entry point
    next(false)
    router.replace({name: 'auth'})
    return
  }

  if (
    store.getters.user !== null &&
    to.name === 'auth'
  ) {
    // Cancel this routing and replace with unlogged entry point
    next(false)
    router.replace({name: 'home'})
    return
  }

  next()
}

router.beforeEach(requiredAuth)

new Vue({
  router,
  store,
  created () {
    auth.onAuthStateChanged(async (authUser) => {
      store.commit('SET_USER', authUser)
      if (authUser) {
        this.$router.push({name: 'home'})

        var user = await UserManager.get(authUser.uid)
        if (!user) {
          UserManager.save((new User(authUser)).toObject(), authUser.id)
        }
      } else {
        this.$router.push({name: 'auth'})
      }
    })
  },
  render: h => h(App)
}).$mount('#app')
