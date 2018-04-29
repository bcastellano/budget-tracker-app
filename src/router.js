import Vue from 'vue'
import Router from 'vue-router'
import AnonLayout from './layouts/AnonLayout.vue'
import MainLayout from './layouts/MainLayout.vue'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Help from './views/Help.vue'
import Auth from './views/Auth.vue'
import NotFound from './views/NotFound.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/auth',
      component: AnonLayout,
      meta: { secured: false },
      children: [
        {
          name: 'auth',
          path: '/',
          component: Auth
        }
      ]
    },
    {
      path: '/',
      component: MainLayout,
      meta: { secured: true },
      children: [
        {
          name: 'home',
          path: '/',
          component: Home
        },
        {
          name: 'about',
          path: '/about',
          component: About
        },
        {
          name: 'help',
          path: '/help',
          component: Help
        }
      ]
    },
    {
      name: 'notFound',
      path: '/*',
      component: NotFound
    }
  ]
})
