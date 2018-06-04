<template>
  <div>
    <v-snackbar v-for="message in messages" :key="message.id"
      v-model="message.show"
      :timeout="message.timeout"
      :color="message.type"
      bottom right
    >
      {{ message.text }}
      <v-btn flat @click.native="message.show = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'Messages',
  computed: {
    messages () {
      let messages = []
      if (this.$store.getters.messages.length > 0) {
        messages = this.$store.getters.messages
        // show first message and execute remove countdown
        messages[0].show = true
        messages[0].remove() // this trigger next message displayed
      }

      return messages
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
