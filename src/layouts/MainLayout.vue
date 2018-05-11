<template>
  <div>
    <Menu :drawer="drawer" />

    <Toolbar :drawer="drawer" v-on:menu-toggle="drawer = $event" />

    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>

    <Footer />
  </div>
</template>

<script>
import Menu from '@/components/Menu'
import Toolbar from '@/components/Toolbar'
import Footer from '@/components/Footer'

export default {
  data: () => ({
    drawer: true
  }),
  components: {
    Menu,
    Toolbar,
    Footer
  }
}
</script>

<style lang="scss">

</style>
