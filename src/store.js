import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/authModule'
import messages from '@/store/messagesModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    messages
  }
})
