<template>
  <v-footer class="pa-3" fixed>
    <v-spacer></v-spacer>
    <strong>
      Budget Tracker -
      <v-chip
        color="primary"
        small
        disabled
        outline
      >
        <a
          href="https://github.com/bcastellano/budget-tracker-app"
          target="_blank"
        >
          {{version}} - License GPL-3.0
        </a>
      </v-chip>
    </strong>
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
a {text-decoration: none}
</style>
