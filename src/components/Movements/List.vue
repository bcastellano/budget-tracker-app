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
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td class="text-xs-right">{{ props.item.description }}</td>
            <td class="text-xs-right">{{ props.item.amount }}</td>
            <td class="text-xs-right">{{ props.item.type }}</td>
            <td class="text-xs-right">{{ props.item.categoryId }}</td>
            <td class="text-xs-right">{{ props.item.accountId }}</td>
            <td class="text-xs-right">{{ props.item.date }}</td>
            <td class="justify-center layout px-0">
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

      <MovementForm :opened="formOpened" :movement="movementData" v-on:form-closed="closeForm($event)" />
    </v-flex>
  </v-layout>
</template>

<script>
import MovementForm from './Form'
import { MovementManager } from '@/models/Movement'
import { mapActions } from 'vuex'

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
        {
          text: 'ID',
          align: 'left',
          sortable: false,
          value: 'id'
        },
        { text: 'Description', value: 'description' },
        { text: 'Amount (€)', value: 'amount' },
        { text: 'Type', value: 'type' },
        { text: 'Category', value: 'categoryId' },
        { text: 'Account', value: 'accountId' },
        { text: 'Date', value: 'date' }
      ]
    }
  },
  firestore () {
    return {
      list: MovementManager.listRealtime()
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
    ...mapActions('messages', ['addMessage'])
  }
}
</script>

<style scoped lang="scss">
</style>
