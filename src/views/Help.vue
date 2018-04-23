<template>
  <div class="home">
    <img src="../assets/logo.png">
    <HelpLinks msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelpLinks from '@/components/HelpLinks.vue'

export default {
  name: 'home',
  components: {
    HelpLinks
  }
}
</script>
