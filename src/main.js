import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuetify from 'vuetify'
import VueFire from 'vuefire'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import { User, UserManager } from '@/models/User'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: colors.green.lighten1,
    secondary: colors.green.lighten4,
    accent: colors.green.accent2
  }
})

Vue.use(VueFire)

async function requiredAuth (to, from, next) {
  console.log('%croute', `background: blue; color: white; padding: 2px 0.5em; border-radius: 0.5em;`, from.path + ' => ' + to.path)

  // if user not stored (not logged or logged reload page)
  if (store.getters['auth/user'] == null) {
    await store.dispatch('auth/loadUser') // wait to store user

    // get user to save or get from collection
    const authUser = store.getters['auth/user']
    if (authUser) {
      var user = await UserManager.get(authUser.uid)
      if (!user) {
        UserManager.save((new User(authUser)).toObject(), authUser.uid)
      }

      // store accounts and categories
      store.dispatch('accounts/load')
      store.dispatch('categories/load')
    }
  }

  if (
    store.getters['auth/user'] == null &&
    to.matched.some(route => route.meta.secured === true)
  ) {
    // Cancel this routing and replace with unlogged entry point. Remember url to go when logged
    next(false)
    router.replace({name: 'auth', query: {to: to.path}})
    return
  }

  if (
    store.getters['auth/user'] !== null &&
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
  render: h => h(App)
}).$mount('#app')
