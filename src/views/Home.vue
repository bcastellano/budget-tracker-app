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
      <v-divider class="ma-4" inset />
      <v-flex>
        <v-flex tag="h3" class="headline">
          User balance in dates
          <v-chip v-if="userBalance" :color="(userBalance.total < 0 ? 'red' : 'green')" text-color="white">
            <v-avatar><v-icon>euro_symbol</v-icon></v-avatar>
            <strong><u>{{ userBalance.total.toFixed(2) }}</u></strong>
          </v-chip>
          <v-chip v-if="userBalance">{{ userBalance.ntrans }} movements</v-chip>
        </v-flex>
        <v-layout row wrap>
          <v-flex xs12 sm6 md2>
            <v-menu ref="menuStart" :close-on-content-click="false" v-model="menuStart" :nudge-right="40" :return-value.sync="dateStart" lazy transition="scale-transition" offset-y full-width min-width="290px">
              <v-text-field
                slot="activator"
                v-model="dateStart"
                label="Date start"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker v-model="dateStart" @input="$refs.menuStart.save(dateStart)"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12 sm6 md2>
            <v-menu ref="menuEnd" :close-on-content-click="false" v-model="menuEnd" :nudge-right="40" :return-value.sync="dateEnd" lazy transition="scale-transition" offset-y full-width min-width="290px">
              <v-text-field
                slot="activator"
                v-model="dateEnd"
                label="Date end"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker v-model="dateEnd" @input="$refs.menuEnd.save(dateEnd)"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12 sm6 md2>
            <v-btn @click="loadUserBalance"><v-icon>refresh</v-icon> refresh</v-btn>
          </v-flex>
        </v-layout>
        <v-container v-if="userBalance" grid-list-xs fluid>
          <v-layout row wrap>
            <div class="text-xs-left">
              <h4>Accounts:</h4>
              <v-chip v-for="(amount,k) in userBalance.accounts" :key="k" :color="(amount < 0 ? 'red' : 'green')">
                <v-avatar><img :src="getAccount(k).image" alt="trevor"></v-avatar>
                {{ getAccount(k).name }}: {{ amount.toFixed(2) }}
              </v-chip>
            </div>

            <div class="text-xs-left">
              <h4>Categories:</h4>
              <v-chip v-for="(amount,k) in userBalance.categories" :key="k" outline :color="(amount < 0 ? 'red' : 'green')">
                <v-avatar><v-icon :style="{ 'color': getCategory(k).color }">{{ getCategory(k).icon }}</v-icon></v-avatar>
                {{ getCategory(k).name }}: {{ amount.toFixed(2) }}
              </v-chip>
            </div>

            <div class="text-xs-left">
              <h4>Tags:</h4>
              <v-chip v-for="(amount,k) in userBalance.tags" :key="k" outline :color="(amount < 0 ? 'red' : 'green')">
                {{ k }}: {{ amount.toFixed(2) }}
              </v-chip>
            </div>
          </v-layout>
        </v-container>
      </v-flex>
      <v-divider class="ma-4" inset />
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
import { DateTime } from 'luxon'
import apiClient from '@/http/client'

const now = DateTime.local()
const dStart = DateTime.local(now.year, now.month, 1).toISODate()
const dEnd = DateTime.local(now.year, now.month, now.daysInMonth).toISODate()

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
      totalAccounts: 0,
      userBalance: null,
      dateStart: dStart,
      menuStart: false,
      dateEnd: dEnd,
      menuEnd: false
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
    this.loadUserBalance()
  },
  methods: {
    getAccount: function (id) {
      return _.find(this.accounts, { 'id': id })
    },
    getCategory: function (id) {
      return _.find(this.categories, { 'id': id })
    },
    loadUserBalance: async function () {
      this.userBalance = await apiClient.getStatsBalance(this.dateStart, this.dateEnd)
    }
  }
}
</script>
