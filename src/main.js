import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import { auth } from './helpers/firebaseConfig'
import { User, UserManager } from '@/models/User'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: colors.green.lighten1,
    secondary: colors.green.lighten4,
    accent: colors.green.accent2
  }
})

function requiredAuth (to, from, next) {
  console.log('%croute', `background: blue; color: white; padding: 2px 0.5em; border-radius: 0.5em;`, from.path + ' => ' + to.path)

  if (
    store.getters.user == null &&
    to.matched.some(route => route.meta.secured === true)
  ) {
    // Cancel this routing and replace with unlogged entry point. Remember url to go when logged
    next(false)
    router.replace({name: 'auth', query: {to: to.path}})
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
        // go to remembered url if exists
        if (this.$route.query.to) {
          this.$router.push(this.$route.query.to)
        }

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
