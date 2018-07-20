<template>
  <div class="home">
    <h1>Home</h1>

    <div v-if="user && user.balance">
      <v-flex>
        <v-flex tag="h3" class="headline">
          Accounts global balance:
          <v-chip :color="(totalAccounts < 0 ? 'red' : 'green')" text-color="white">
            <v-avatar><v-icon>euro_symbol</v-icon></v-avatar>
            <strong><u>{{ totalAccounts.toFixed(2) }}</u></strong>
          </v-chip>
        </v-flex>
        <v-container grid-list-xs fluid>
          <v-layout row wrap>
            <account-card
              v-for="(n,k) in user.balance.accounts"
              :key="k"
              :account="getAccount(k)"
              :stats="n"
            />
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex>
        <v-flex tag="h3" class="headline">Categories global balance</v-flex>
        <v-container grid-list-md fluid>
          <v-layout row wrap>
            <category-card
              v-for="(n,k) in user.balance.categories"
              :key="k"
              :category="getCategory(k)"
              :stats="n"
            />
          </v-layout>
        </v-container>
      </v-flex>
    </div>
  </div>
</template>

<script>
import { UserManager } from '@/models/User'
import AccountCard from '@/components/Home/AccountCard'
import CategoryCard from '@/components/Home/CategoryCard'
import _ from 'lodash/collection'
import _math from 'lodash/math'
import _lang from 'lodash/lang'

export default {
  name: 'home',
  components: {
    AccountCard,
    CategoryCard
  },
  data () {
    return {
      user: null,
      accounts: [],
      categories: [],
      totalAccounts: 0
    }
  },
  firestore () {
    return {
      accounts: this.$store.getters['accounts/list'],
      categories: this.$store.getters['categories/list']
    }
  },
  async created () {
    const uid = this.$store.getters['auth/user'].uid
    this.user = await UserManager.get(uid)
    this.totalAccounts = _math.sumBy(_lang.toArray(this.user.balance.accounts), (o) => o.value)
  },
  methods: {
    getAccount: function (id) {
      return _.find(this.accounts, { 'id': id })
    },
    getCategory: function (id) {
      return _.find(this.categories, { 'id': id })
    }
  }
}
</script>
