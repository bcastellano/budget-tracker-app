<template>
  <div class="home">
    <h1>Home</h1>

    <button @click="logOut">Log out</button>
    <p>{{name}}</p>
    <p>{{email}}</p>
    <p>{{userId}}</p>
    <pre>{{user}}</pre>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'home',
  data () {
    return {
      userId: '',
      name: '',
      email: '',
      user: {}
    }
  },
  created () {
    this.user = firebase.auth().currentUser
    if (this.user) {
      this.name = this.user.displayName
      this.email = this.user.email
      this.userId = this.user.uid
    }
  },
  methods: {
    logOut () {
      firebase.auth().signOut()
      this.$router.push({name: 'auth'})
    }
  }
}
</script>
