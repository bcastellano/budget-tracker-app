<template>
  <v-footer class="pa-3" fixed>
    <v-spacer></v-spacer>
    <strong>Budget Tracker</strong> - {{version}} - License GPL-3.0
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      version: 'v' + window.appVersion
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
* { font-size: 12px }
</style>
