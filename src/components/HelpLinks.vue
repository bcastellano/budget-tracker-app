<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://github.com/vuejs/vue-cli/tree/dev/docs" target="_blank">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa" target="_blank">pwa</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank">eslint</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-jest" target="_blank">unit-jest</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-e2e-cypress" target="_blank">e2e-cypress</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org/en/essentials/getting-started.html" target="_blank">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org/en/intro.html" target="_blank">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org/en" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
    <h3>Vuetify</h3>
    <ul>
      <li><a href="https://vuetifyjs.com/en/theme-generator" target="_blank">theme generator</a></li>
      <li><a href="https://vuetifyjs.com/en/layout/pre-defined" target="_blank">vuetify docs</a></li>
      <li><a href="https://material.io/icons/" target="_blank">material icons</a></li>
    </ul>
    <h3>Tests</h3>
    <ul>
      <li><a href="https://dashboard.cypress.io/#/login" target="_blank">cypress</a></li>
      <li><a href="https://vue-test-utils.vuejs.org/en/" target="_blank">vue-test-utils</a></li>
    </ul>
    <h3>Firebase</h3>
    <ul>
      <li><a href="https://medium.com/dailyjs/authenticating-a-vue-js-application-with-firebase-ui-8870a3a5cff8" target="_blank">authenticating-a-vue-js-application-with-firebase-ui</a></li>
      <li><a href="https://github.com/rstormsf/friendsmap" target="_blank">github.com/rstormsf/friendsmap</a></li>
      <li><a href="https://firebase.google.com/docs/auth/?hl=es-419" target="_blank">firebase auth</a></li>
      <li><a href="https://github.com/firebase/firebaseui-web" target="_blank">firebaseui-web</a></li>
      <li><a href="https://gist.github.com/mickaelandrieu/a66bdf031a3c5fa4caf301504f018904" target="_blank">gist.github.com/mickaelandrieu</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelpLinks',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
