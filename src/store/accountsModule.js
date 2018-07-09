import { AccountManager } from '@/models/Account'

const state = {
  accounts: []
}

const actions = {
  load ({ commit }) {
    const accounts = AccountManager.listRealtime()

    commit('SET_ACCOUNTS', accounts)

    return accounts
  }
}

const mutations = {
  SET_ACCOUNTS (state, accounts) {
    state.accounts = accounts
  }
}

const getters = {
  list: state => state.accounts
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
