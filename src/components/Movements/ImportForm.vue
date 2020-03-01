<template>
  <div>
    <v-dialog v-model="opened" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click.native="close">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Movements import</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-stepper v-model="step">
            <v-stepper-header>
              <v-stepper-step :complete="step > 1" step="1">Import</v-stepper-step><v-divider></v-divider>
              <v-stepper-step :complete="step > 2" step="2">Map</v-stepper-step><v-divider></v-divider>
              <v-stepper-step :complete="step > 3" step="3" :editable="step > 3">Complete</v-stepper-step><v-divider></v-divider>
              <v-stepper-step step="4">Summary</v-stepper-step><v-divider></v-divider>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-form ref="form" v-model="importFormValid">
                  <v-select
                    :items="accounts"
                    item-value="id"
                    item-text="name"
                    v-model="accountId"
                    :rules="rules.account"
                    label="Select account"
                    prepend-icon="account_balance"
                    required
                  ></v-select>

                  <v-text-field
                    name="csv"
                    v-model="csv"
                    :rules="rules.csv"
                    label="RAW CSV data"
                    prepend-icon="attachment"
                    required
                    multi-line
                  ></v-text-field>
                </v-form>

                <v-btn color="primary" @click.native="processImport">Import</v-btn>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-form v-if="parsedCsv" ref="form2">
                  Found {{ parsedCsv.data.length }} rows map inputs:
                  <v-card v-for="field in parsedCsv.meta.fields"
                    :key="field"
                  >
                    <v-layout row wrap>
                      <v-flex xs2>
                        <v-subheader>
                          "{{ field }}" mapped to
                        </v-subheader>
                      </v-flex>
                      <v-select
                        :items="movementInfo"
                        item-value="name"
                        item-text="text"
                        v-model="movementInfoMap[field]"
                      ></v-select>
                    </v-layout>

                  </v-card>
                </v-form>

                <v-btn color="primary" @click.native="mapImport">Continue</v-btn>
              </v-stepper-content>

              <v-stepper-content step="3">

                <MovementImportFormEditItem
                  :movementList="movementList"
                  :accounts="accounts"
                  :categories="categories"
                  v-on:data-completed="complete"
                ></MovementImportFormEditItem>
              </v-stepper-content>

              <v-stepper-content step="4">
                <v-form ref="form3">
                  Summary: saving {{ movementList.length }} items:

                  <v-data-table
                    :headers="headers"
                    :items="movementList"
                  >
                    <template slot="items" slot-scope="props">
                      <td>{{ props.item.description }}</td>
                      <td :class="props.item.type === 'expense' ? 'red--text' : 'green--text'">{{ props.item.type === 'expense' ? '-' : '' }}{{ props.item.amount }}</td>
                      <td>{{ getCategoryName(props.item.categoryId) }}</td>
                      <td>{{ getAccountName(props.item.accountId) }}</td>
                      <td>{{ props.item.date }}</td>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                      No movements to import
                    </v-alert>
                  </v-data-table>
                </v-form>

                <v-btn color="primary" @click.native="save">Save</v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Papa from 'papaparse'
import MovementImportFormEditItem from './ImportFormEditItem'
import { MovementManager } from '@/models/Movement'
import _collection from 'lodash/collection'
import _object from 'lodash/object'

export default {
  name: 'MovementImportForm',
  components: {
    MovementImportFormEditItem
  },
  props: {
    opened: Boolean,
    accounts: Array,
    categories: Array,
    headers: Array
  },
  data () {
    return {
      accountId: null,
      movementList: [],
      importFormValid: false,
      importProcessed: false,
      step: 1,
      csv: 'description,amount,date\nHipoteca,-724,2019-08-24\notro,30,2019-09-24\n',
      parsedCsv: null,
      rules: {
        account: [
          v => !!v || 'Select an account'
        ],
        csv: [
          v => !!v || 'Paste raw CSV file'
        ]
      },
      movementInfo: [
        { text: 'Description', name: 'description' },
        { text: 'Amount', name: 'amount' },
        { text: 'Date', name: 'date' },
        { text: 'Category', name: 'category' },
        { text: 'Tags', name: 'tags' }
      ],
      movementInfoMap: {}
    }
  },
  methods: {
    close: function () {
      this.$emit('import-closed', false)
      this.movementList = []
      this.step = 1
    },
    processImport: function () {
      if (this.$refs.form.validate()) {
        this.parsedCsv = Papa.parse(this.csv, { header: true, skipEmptyLines: true })

        this.parsedCsv.meta.fields.forEach(field => {
          this.movementInfoMap[field] = ''
        })

        this.step = 2
      }
    },
    mapImport: function () {
      if (!this.movementInfoMap.amount ||
        !this.movementInfoMap.description ||
        !this.movementInfoMap.date
      ) {
        alert('You have to select the field map')
        return
      }

      (this.parsedCsv.data || []).forEach(csvRow => {
        let obj = {}
        _object.forIn(this.movementInfoMap, (value, key) => {
          if (value) {
            obj[value] = csvRow[key]
          }
        })

        obj.accountId = this.accountId
        obj.type = obj.amount < 0 ? 'expense' : 'income'
        obj.amount = Math.abs(obj.amount)
        let movement = MovementManager.getModelInstance(obj)

        this.movementList.push(movement)
      })

      this.step = 3
    },
    complete: function () {
      this.step = 4
    },
    save: function () {
      this.movementList.forEach(move => {
        MovementManager
          .save(MovementManager.getModelInstance(move).toObject(), move.id)
          .then(() => {
            this.addMessage({ text: `Movement "${move.description}" saved`, type: 'success' })
            this.close()
          })
      })
    },
    getAccountName: function (id) {
      const obj = _collection.find(this.accounts, { 'id': id })
      return obj ? obj.name : id
    },
    getCategoryName: function (id) {
      const obj = _collection.find(this.categories, { 'id': id })
      return obj ? obj.name : id
    },
    ...mapActions('messages', ['addMessage'])
  }
}
</script>
