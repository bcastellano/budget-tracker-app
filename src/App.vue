<template>
  <v-app id="app">
    <Messages />

    <router-view/>
  </v-app>
</template>

<script>
import Messages from '@/components/Messages'

export default {
  components: {
    Messages
  }
}
</script>

<style lang="scss">
</style>
