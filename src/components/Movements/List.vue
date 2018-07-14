<template>
  <v-layout row>
    <v-flex>
      <v-card class="">
        <v-card-title>
          {{list.length}} movements
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="list"
          :search="search"
          :rows-per-page-items="[10,25,{'text':'Todos','value':-1}]"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.description }}</td>
            <td :class="props.item.type === 'expense' ? 'red--text' : 'green--text'">{{ props.item.type === 'expense' ? '-' : '' }}{{ props.item.amount }}</td>
            <td>{{ getCategoryName(props.item.categoryId) }}</td>
            <td>{{ getAccountName(props.item.accountId) }}</td>
            <td>{{ props.item.date }}</td>
            <td>
              <v-btn icon class="mx-0" @click="openForm(props.item)">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </v-data-table>

        <v-btn color="primary" absolute top right fab @click.stop="openForm()">
          <v-icon>add</v-icon>
        </v-btn>
      </v-card>

      <MovementForm
        :opened="formOpened"
        :movement="movementData"
        :accounts="accounts"
        :categories="categories"
        v-on:form-closed="closeForm($event)"
      ></MovementForm>
    </v-flex>
  </v-layout>
</template>

<script>
import MovementForm from './Form'
import { MovementManager } from '@/models/Movement'
import { mapActions } from 'vuex'
import _ from 'lodash/collection'

export default {
  name: 'MovementList',
  components: {
    MovementForm
  },
  data () {
    return {
      formOpened: false,
      movementData: {},
      list: [],
      search: '',
      headers: [
        { text: 'Description', sortable: false, value: 'description' },
        { text: 'Amount (€)', value: 'amount' },
        { text: 'Category', value: 'categoryId' },
        { text: 'Account', value: 'accountId' },
        { text: 'Date', value: 'date' },
        { text: 'actions' }
      ],
      accounts: [],
      categories: []
    }
  },
  firestore () {
    return {
      list: MovementManager.listRealtime(),
      accounts: this.$store.getters['accounts/list'],
      categories: this.$store.getters['categories/list']
    }
  },
  methods: {
    openForm: function (movement) {
      this.movementData = Object.assign(movement ? {id: movement.id} : {}, movement)
      this.formOpened = true
    },
    closeForm: function (event) {
      this.movementData = {}
      this.formOpened = false
    },
    deleteItem: function (movement) {
      this.$root.$confirm('Delete', 'Are you sure?', { color: 'red' })
        .then((confirm) => {
          if (confirm) {
            MovementManager.remove(movement.id)
            this.addMessage({text: `Movement "${movement.description}" deleted`, type: 'success'})
          }
        })
    },
    getAccountName: function (id) {
      const obj = _.find(this.accounts, { 'id': id })
      return obj ? obj.name : id
    },
    getCategoryName: function (id) {
      const obj = _.find(this.categories, { 'id': id })
      return obj ? obj.name : id
    },
    ...mapActions('messages', ['addMessage'])
  }
}
</script>

<style scoped lang="scss">
</style>
