<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <div id="firebaseui-auth-container"></div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
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
