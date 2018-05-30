<template>
  <div>
    <v-card>
      <v-container fluid style="min-height: 0;" grid-list-lg>
        <v-layout v-if="list.length == 0" row wrap>
          <v-flex xs12 text-xs-center>
            <span>
              <v-icon medium>info</v-icon> list is empty, create an account
              <v-btn flat icon color="primary" @click="openForm()">
                <v-icon>add</v-icon>
              </v-btn>
            </span>
          </v-flex>
        </v-layout>

        <v-layout v-if="list.length > 0" v-for="account in list" :key="account.name" row wrap>
          <v-flex xs12>
            <v-card :style="{ 'background-color': account.color, 'color': account.colorText }">
              <v-card-title>
                <div class="headline"><v-icon x-large dark>account_balance</v-icon>{{ account.name }}</div>
                <div>Total money <strong>{{ account.amount }}</strong>€</div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark @click="openForm(account)">edit</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>

        <v-btn color="primary" absolute top right fab @click.stop="openForm()">
          <v-icon>add</v-icon>
        </v-btn>
      </v-container>
    </v-card>

    <AccountForm :opened="formOpened" :account="accountData" v-on:form-closed="closeForm($event)" />
  </div>
</template>

<script>
import AccountForm from './Form'
import {AccountManager} from '@/models/Account'

export default {
  name: 'AccountList',
  components: {
    AccountForm
  },
  data () {
    return {
      formOpened: false,
      accountData: {},
      list: []
    }
  },
  created () {
    AccountManager.list().then(list => {
      if (list) {
        this.list = list
      }
    })
  },
  methods: {
    openForm: function (account) {
      this.accountData = Object.assign({}, account)
      this.formOpened = true
    },
    closeForm: function (event) {
      this.accountData = {}
      this.formOpened = false
    }
  }
}
</script>
