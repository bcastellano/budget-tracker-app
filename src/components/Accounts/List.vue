<template>
  <div>
    <v-card>
      <v-container fluid style="min-height: 0;" grid-list-lg>
        {{list.length}} accounts
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
            <v-card class="border" :style="{ 'border-color': account.color }">
              <v-container fluid grid-list-xs>
                <v-layout row>
                  <v-flex xs3>
                    <v-card-media contain :src="account.image" width="125px" height="125px"></v-card-media>
                  </v-flex>
                  <v-flex>
                    <v-card-title>
                      <div>
                        <div class="headline">{{ account.name }}</div>
                        <div>Total money <strong>{{ account.amount }}</strong>€</div>
                      </div>
                    </v-card-title>
                    <v-card-actions>
                      <v-btn color="secondary" @click="openForm(account)">edit</v-btn>
                    </v-card-actions>
                  </v-flex>
                </v-layout>
              </v-container>
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
  firestore () {
    return {
      list: this.$store.getters['accounts/list']
    }
  },
  methods: {
    openForm: function (account) {
      this.accountData = Object.assign(account ? {id: account.id} : {}, account)
      this.formOpened = true
    },
    closeForm: function (event) {
      this.accountData = {}
      this.formOpened = false
    }
  }
}
</script>

<style scoped lang="scss">
.border.card { border-right:solid 5px; }
</style>
