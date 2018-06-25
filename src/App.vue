<template>
  <v-app id="app">
    <Messages />
    <Confirm ref="confirm"></Confirm>

    <router-view/>
  </v-app>
</template>

<script>
import Messages from '@/components/Messages'
import Confirm from '@/components/Confirm'

export default {
  mounted () {
    this.$root.$confirm = this.$refs.confirm.open
  },
  components: {
    Messages,
    Confirm
  }
}
</script>

<style lang="scss">
</style>
