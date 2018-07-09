import { CategoryManager } from '@/models/Category'

const state = {
  categories: []
}

const actions = {
  load ({ commit }) {
    const categories = CategoryManager.listRealtime()

    commit('SET_CATEGORIES', categories)

    return categories
  }
}

const mutations = {
  SET_CATEGORIES (state, categories) {
    state.categories = categories
  }
}

const getters = {
  list: state => state.categories
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
