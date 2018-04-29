<template>
  <v-content>
    <v-container fluid>
      <div class="notfound">
        <h1>404 Page not found</h1>

        <router-link :to="{ name: 'home' }">Return to home</router-link>
      </div>
    </v-container>
  </v-content>
</template>
