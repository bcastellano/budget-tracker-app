import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let maxMessageId = 0

export default new Vuex.Store({
  state: {
    user: null,
    messages: []
  },
  getters: {
    user: state => state.user,
    messages: state => state.messages
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user
    },
    ADD_MESSAGE (state, message) {
      state.messages.push(message)
    },
    REMOVE_MESSAGE (state, id) {
      state.messages = state.messages.filter(m => m.id !== id)
    }
  },
  actions: {
    ADD_MESSAGE ({ commit }, { text, type = 'info', timeout = 2000 }) {
      const id = ++maxMessageId
      const message = {
        id: id,
        text: text,
        type: type,
        timeout: timeout,
        remove: function () {
          setTimeout(() => {
            commit('REMOVE_MESSAGE', id)
          }, timeout)
        }
      }

      commit('ADD_MESSAGE', message)
    },
    REMOVE_MESSAGE ({ commit }, id) {
      commit('REMOVE_MESSAGE', id)
    }
  }
})
