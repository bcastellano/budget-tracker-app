<template>
  <div class="home">
    <h1>Home</h1>

    <v-layout v-if="user && user.balance">
      <v-flex xs6>
        <v-flex tag="h3" class="headline">Accounts balance</v-flex>
        <v-container grid-list-md fluid>
          <v-layout row wrap>
            <v-flex
              v-for="(n,k) in user.balance.accounts"
              :key="k"
              xs4
            >
              <v-card flat tile>
                <v-card-title>{{k}}: <pre>{{n}}</pre></v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs6>
        <v-flex tag="h3" class="headline">Categories balance</v-flex>
        <v-container grid-list-md fluid>
          <v-layout row wrap>
            <v-flex
              v-for="(n,k) in user.balance.categories"
              :key="k"
              xs4
            >
              <v-card flat tile>
                <v-card-title>{{k}}: <pre>{{n}}</pre></v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { UserManager } from '@/models/User'

export default {
  name: 'home',
  data () {
    return {
      user: null
    }
  },
  async created () {
    const uid = this.$store.getters['auth/user'].uid
    this.user = await UserManager.get(uid)
  }
}
</script>
