<template>
  <v-navigation-drawer clipped fixed v-model="drawer" app :mini-variant="mini">
    <v-list dense>
      <template v-for="item in menuItems">
        <v-list-tile :key="item.title" :to="item.to" v-if="!item.divider">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider v-if="item.divider" :key="item.title"></v-divider>
      </template>

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
const menuItems = [
  {title: 'Dashboard', icon: 'dashboard', to: {name: 'home'}},
  {divider: true},
  {title: 'Accounts', icon: 'account_balance', to: {name: 'accounts'}},
  {title: 'Categories', icon: 'label', to: {name: 'categories'}},
  {title: 'Movements', icon: 'swap_horiz', to: {name: 'movements'}},
  {divider: true},
  {title: 'Settings', icon: 'settings', to: {name: 'settings'}},
  {title: 'About', icon: 'info', to: {name: 'about'}},
  {title: 'Help', icon: 'help', to: {name: 'help'}},
  {divider: true}
]

export default {
  name: 'Menu',
  data: () => ({
    mini: true,
    menuItems
  }),
  props: {
    drawer: Boolean
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
