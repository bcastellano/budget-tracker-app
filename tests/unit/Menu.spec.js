import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Menu from '@/components/Menu.vue'

describe('Menu.vue', () => {
  let wrapper

  const routes = [
    { path: '/dashboard', name: 'home' },
    { path: '/accounts', name: 'accounts' },
    { path: '/categories', name: 'categories' },
    { path: '/settings', name: 'settings' },
    { path: '/movements', name: 'movements' },
    { path: '/about', name: 'about' },
    { path: '/help', name: 'help' }
  ]

  const router = new VueRouter({ routes })

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    localVue.use(Vuetify)

    wrapper = mount(Menu, {
      localVue: localVue,
      router
    })
  })

  it('aside menu opens and closes', () => {
    wrapper.setProps({ drawer: false })
    expect(wrapper.classes()).toContain('navigation-drawer--close')

    wrapper.setProps({ drawer: true })
    expect(wrapper.classes()).toContain('navigation-drawer--open')
  })

  it('aside menu as mini variant', () => {
    wrapper.setData({ mini: true })
    expect(wrapper.classes()).toContain('navigation-drawer--mini-variant')
  })
})
