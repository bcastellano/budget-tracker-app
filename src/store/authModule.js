const state = {
  user: null
}

const actions = {
}

const mutations = {
  SET_USER (state, user) {
    state.user = user
  }
}

const getters = {
  user: state => state.user
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
