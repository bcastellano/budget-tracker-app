import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    fireApp: null,
    fireUiApp: null
  },
  getters: {
    user: state => state.user,
    fireApp: state => state.fireApp,
    fireUiApp: state => state.fireUiApp
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user
    },
    SET_FIRE_APP (state, fireApp) {
      state.fireApp = fireApp
    },
    SET_FIRE_UI_APP (state, fireUiApp) {
      state.fireUiApp = fireUiApp
    }
  },
  actions: {

  }
})
