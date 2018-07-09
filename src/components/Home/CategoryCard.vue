<template>
  <v-flex>
    <v-card class="pa-2 ma-2">
      <v-container fluid grid-list-xs>
        <v-layout row>
          <v-flex xs4>
            <v-icon :style="'color:'+category.color">{{category.icon}}</v-icon>
          </v-flex>
          <v-flex>
            <v-card-title class="pa-1">{{ category.name }}</v-card-title>
            <v-card-text :class="(stats.value < 0 ? 'red--text' : 'green--text') + ' pa-1'">{{ stats.value.toFixed(2) }} €</v-card-text>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'CategoryCard',
  props: {
    category: Object,
    stats: Object
  }
}
</script>
