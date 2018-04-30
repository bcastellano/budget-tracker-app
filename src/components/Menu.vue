<template>
  <v-navigation-drawer clipped fixed v-model="drawer" app :mini-variant.sync="mini">
    <v-list dense>
      <v-list-tile :to='{name: "home"}'>
        <v-list-tile-action>
          <v-icon>dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Dashboard</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider></v-divider>

      <v-list-tile :to='{name: "accounts"}'>
        <v-list-tile-action>
          <v-icon>account_balance</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Accounts</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to='{name: "categories"}'>
        <v-list-tile-action>
          <v-icon>label</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Categories</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to='{name: "movements"}'>
        <v-list-tile-action>
          <v-icon>swap_horiz</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Movements</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider></v-divider>

      <v-list-tile :to='{name: "settings"}'>
        <v-list-tile-action>
          <v-icon>settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Settings</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to='{name: "about"}'>
        <v-list-tile-action>
          <v-icon>info</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>About</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to='{name: "help"}'>
        <v-list-tile-action>
          <v-icon>help</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Help</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile>
        <v-list-tile-content></v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon @click.native.stop="mini = !mini">
            <v-icon>{{ !mini ? 'chevron_left' : 'chevron_right' }}</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Menu',
  data: () => ({
    mini: false
  }),
  props: {
    drawer: Boolean
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
