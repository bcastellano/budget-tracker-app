import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { auth } from './helpers/firebaseConfig'

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
    auth.onAuthStateChanged((user) => {
      store.commit('SET_USER', user)
      if (user) {
        this.$router.push({name: 'home'})
      } else {
        this.$router.push({name: 'auth'})
      }
    })
  },
  render: h => h(App)
}).$mount('#app')
