<template>
  <div>
    <Menu :drawer="drawer" />

    <Toolbar :drawer="drawer" v-on:menu-toggle="drawer = $event" />

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
import Toolbar from '@/components/Toolbar'

export default {
  data: () => ({
    drawer: true
  }),
  components: {
    Menu,
    Toolbar
  }
}
</script>

<style lang="scss">

</style>
