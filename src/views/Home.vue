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
          <v-chip @click="showMovements()" v-if="userBalance" :color="(userBalance.total < 0 ? 'red' : 'green')" text-color="white">
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
              <v-chip @click="showMovements('accountId', k)" v-for="(amount,k) in userBalance.accounts" :key="k" :color="(amount < 0 ? 'red' : 'green')">
                <v-avatar><img :src="getAccount(k).image" alt="trevor"></v-avatar>
                {{ getAccount(k).name }}: {{ amount.toFixed(2) }}
              </v-chip>
            </div>

            <div class="text-xs-left">
              <h4>Categories:</h4>
              <v-chip @click="showMovements('categoryId', k)" v-for="(amount,k) in userBalance.categories" :key="k" outline :color="(amount < 0 ? 'red' : 'green')">
                <v-avatar><v-icon :style="{ 'color': getCategory(k).color }">{{ getCategory(k).icon }}</v-icon></v-avatar>
                {{ getCategory(k).name }}: {{ amount.toFixed(2) }}
              </v-chip>
            </div>

            <div class="text-xs-left">
              <h4>Tags:</h4>
              <v-chip @click="showMovements('tags.'+k, true)" v-for="(amount,k) in userBalance.tags" :key="k" outline :color="(amount < 0 ? 'red' : 'green')">
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

    <v-dialog v-model="movementsDialog" persistent>
      <v-card>
        <v-card-title class="headline">Movements</v-card-title>

        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="itemsFiltered"
            hide-actions
            v-model="selected"
            select-all
            item-key="id"
          >
            <template slot="items" slot-scope="props">
              <td>
                <v-checkbox
                  v-model="props.selected"
                  primary
                  hide-details
                ></v-checkbox>
              </td>
              <td>{{ props.index +1 }}</td>
              <td>{{ props.item.description }}</td>
              <td :class="props.item.type === 'expense' ? 'red--text' : 'green--text'">{{ props.item.type === 'expense' ? '-' : '' }}{{ props.item.amount }}</td>
              <td>{{ getCategory(props.item.categoryId).name }}</td>
              <td>{{ getAccount(props.item.accountId).name }}</td>
              <td>{{ props.item.date }}</td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              no results found
            </v-alert>
          </v-data-table>

          There are {{ selected.length }} items selected with a total of
          <v-chip :color="(sum(selected) < 0 ? 'red' : 'green')" text-color="white">
            <v-avatar><v-icon>euro_symbol</v-icon></v-avatar>
            <strong><u>{{ sum(selected).toFixed(2) }}</u></strong>
          </v-chip>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat="flat" @click="movementsDialog = false; selected = []">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      menuEnd: false,
      headers: [
        { text: 'index', sortable: false },
        { text: 'Description', sortable: false, value: 'description' },
        { text: 'Amount (€)', value: 'amount' },
        { text: 'Category', value: 'categoryId' },
        { text: 'Account', value: 'accountId' },
        { text: 'Date', value: 'date' }
      ],
      movementsDialog: false,
      itemsFiltered: [],
      selected: []
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
    },
    showMovements: function (field, value) {
      this.itemsFiltered = this.userBalance.movements
      if (field && value) {
        this.itemsFiltered = _.filter(this.userBalance.movements, [field, value])
      }
      this.movementsDialog = true
    },
    sum: function (items) {
      return _math.sumBy(items, (o) => o.amount * (o.type === 'expense' ? -1 : 1))
    }
  }
}
</script>

<style>
table th, table td, table tr, table thead, table tbody {
  display: block;
}

table tr {
    clear: both;
}

table tbody {
    height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
}

table tbody td,table thead th {
    width: 10%;
    float: left;
}

table tbody td:first-child, table thead th:first-child {
    padding: 10px 0 0 0;
}

table tbody td:not(:first-child), table thead th:not(:first-child) {
    padding: 15px 0 0 0;
}
</style>
