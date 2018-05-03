<template>
  <v-toolbar app fixed clipped-left>
    <v-toolbar-side-icon @click.stop="$emit('menu-toggle', drawer = !drawer)"></v-toolbar-side-icon>
    <v-toolbar-title>Budget Tracker</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat>{{ email }}</v-btn>
    </v-toolbar-items>
    <v-tooltip bottom>
      <span>Logout</span>
      <v-btn icon slot="activator" @click="logOut">
        <v-icon>close</v-icon>
      </v-btn>
    </v-tooltip>
  </v-toolbar>
</template>

<script>
import firebase from 'firebase'
import store from '@/store'

export default {
  name: 'Toolbar',
  computed: {
    email: () => store.getters.user.email
  },
  props: {
    drawer: Boolean
  },
  methods: {
    logOut: () => firebase.auth().signOut()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
