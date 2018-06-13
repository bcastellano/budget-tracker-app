
let maxMessageId = 0

const state = {
  messages: []
}

const actions = {
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

const mutations = {
  ADD_MESSAGE (state, message) {
    state.messages.push(message)
  },
  REMOVE_MESSAGE (state, id) {
    state.messages = state.messages.filter(m => m.id !== id)
  }
}

const getters = {
  messages: state => state.messages
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
