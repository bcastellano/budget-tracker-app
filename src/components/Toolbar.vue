<template>
  <v-toolbar app fixed clipped-left>
    <v-toolbar-side-icon @click.stop="$emit('menu-toggle', menuState = !menuState)"></v-toolbar-side-icon>
    <v-toolbar-title>Budget Tracker</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn :to="{name: 'profile'}" flat>{{ email }}</v-btn>
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

export default {
  name: 'Toolbar',
  computed: {
    email () {
      return this.$store.getters['auth/user'].email
    }
  },
  data () {
    return {
      menuState: this.drawer
    }
  },
  props: {
    drawer: Boolean
  },
  methods: {
    logOut () {
      firebase.auth().signOut()
      this.$store.dispatch('auth/setUser', null)
      this.$router.push({ name: 'auth' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
