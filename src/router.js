import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Help from './views/Help.vue'
import Auth from './views/Auth.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { secured: true }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: { secured: true }
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    }
  ]
})
