<template>
  <div>
    <v-card>
      <v-container fluid style="min-height: 0;" grid-list-lg>
        <v-layout v-for="account in list" :key="account.name" row wrap>
          <v-flex xs12>
            <v-card :color="account.color" :class="account.colorText">
              <v-card-title>
                <div class="headline"><v-icon x-large dark>{{ account.icon }}</v-icon>{{ account.name }}</div>
                <div>Total money <strong>{{ account.amount }}</strong>€</div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark>edit</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>

        <v-btn color="primary" absolute top right fab @click.stop="formOpened = true">
          <v-icon>add</v-icon>
        </v-btn>
      </v-container>
    </v-card>

    <AccountForm :opened="formOpened" v-on:form-closed="formOpened = $event" />
  </div>
</template>

<script>
import AccountForm from './Form'

export default {
  name: 'AccountList',
  props: {
    list: Array
  },
  components: {
    AccountForm
  },
  data () {
    return {
      formOpened: false
    }
  }
}
</script>
