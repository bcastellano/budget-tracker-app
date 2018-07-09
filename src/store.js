import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/authModule'
import messages from '@/store/messagesModule'
import accounts from '@/store/accountsModule'
import categories from '@/store/categoriesModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    messages,
    accounts,
    categories
  }
})
