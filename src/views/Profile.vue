<template>
  <div class="profile">
    <h1>Profile</h1>

    <p>{{name}}</p>
    <p>{{email}}</p>
    <p>{{userId}}</p>
    <pre>{{user}}</pre>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'profile',
  data () {
    return {
      userId: '',
      name: '',
      email: '',
      user: {}
    }
  },
  created () {
    this.user = store.getters.user
    if (this.user) {
      this.name = this.user.displayName
      this.email = this.user.email
      this.userId = this.user.uid
    }
  }
}
</script>
