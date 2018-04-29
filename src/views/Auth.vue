<template lang="html">
  <div id="firebaseui-auth-container"></div>
</template>
<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase'

const uiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
}

export default {
  name: 'auth',

  computed: {
    ...mapGetters({
      fireUiApp: 'fireUiApp'
    })
  },

  mounted () {
    this.fireUiApp.start('#firebaseui-auth-container', uiConfig)
  },

  destroyed () {
    this.fireUiApp.reset()
  }
}
</script>

<style src="firebaseui/dist/firebaseui.css"></style>
