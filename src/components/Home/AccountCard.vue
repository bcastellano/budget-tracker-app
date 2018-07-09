<template>
  <v-flex>
    <v-card class="pa-2 ma-2" :style="'border-bottom: solid 4px'+account.color">
      <v-container fluid grid-list-xs>
        <v-layout row>
          <v-flex xs4>
            <v-card-media contain :src="account.image" width="50px" height="50px"></v-card-media>
          </v-flex>
          <v-flex>
            <v-card-title class="pa-1">{{ account.name }}</v-card-title>
            <v-card-text :class="(stats.value < 0 ? 'red--text' : 'green--text') + ' pa-1'">{{ stats.value.toFixed(2) }} €</v-card-text>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'AccountCard',
  props: {
    account: Object,
    stats: Object
  }
}
</script>
