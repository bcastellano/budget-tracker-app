import Vue from 'vue'
import Router from 'vue-router'
import AnonLayout from './layouts/AnonLayout.vue'
import MainLayout from './layouts/MainLayout.vue'
import Home from './views/Home.vue'
import Accounts from './views/Accounts.vue'
import Categories from './views/Categories.vue'
import Movements from './views/Movements.vue'
import Settings from './views/Settings.vue'
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
          path: '/dashboard',
          alias: '/',
          component: Home
        },
        {
          name: 'accounts',
          path: '/accounts',
          component: Accounts
        },
        {
          name: 'categories',
          path: '/categories',
          component: Categories
        },
        {
          name: 'movements',
          path: '/movements',
          component: Movements
        },
        {
          name: 'settings',
          path: '/settings',
          component: Settings
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
