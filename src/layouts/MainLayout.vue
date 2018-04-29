<template>
  <div>
    <Menu :drawer="drawer" />

    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Budget Tracker</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>

    <v-footer app fixed>
      <span>&copy; 2018</span>
    </v-footer>
  </div>
</template>

<script>
import Menu from '@/components/Menu'

export default {
  data: () => ({
    drawer: true
  }),
  components: {
    Menu
  }
}
</script>

<style lang="scss">

</style>
