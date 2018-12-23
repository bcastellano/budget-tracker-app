import { auth } from '@/helpers/firebaseConfig'

const state = {
  user: null
}

const actions = {
  setUser ({ commit }, user) {
    commit('SET_USER', user)
  },
  async loadUser ({ commit }) {
    const user = await getCurrentFirebaseUser()
    if (user) {
      commit('SET_USER', user)
    } else {
      commit('SET_USER', null)
    }
  }
}

const mutations = {
  SET_USER (state, user) {
    console.log('SETTING USER....', user)
    state.user = user
  }
}

const getters = {
  user: state => state.user
}

function getCurrentFirebaseUser () {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log('%cauth', `background: red; color: white; padding: 2px 0.5em; border-radius: 0.5em;`, 'onAuthStateChanged')
      unsubscribe()
      resolve(user)
    })
  })
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
