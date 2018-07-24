<template>
  <div>
    <v-dialog v-model="opened" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click.native="close">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Movement</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="save">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-if="movement.id"
              v-model="movement.id"
              label="Id"
              prepend-icon="fingerprint"
              disabled
            ></v-text-field>

            <v-text-field
              v-model.trim="movement.description"
              :rules="rules.description"
              :counter="50"
              label="Description"
              prepend-icon="description"
              required
            ></v-text-field>

            <v-radio-group
              v-model="movement.type"
              :rules="rules.type"
              row
              prepend-icon="ballot"
              required
            >
              <v-radio color="red" label="Expense" value="expense"></v-radio>
              <v-radio color="green" label="Income" value="income"></v-radio>
            </v-radio-group>

            <v-text-field
              v-model.number="movement.amount"
              :rules="rules.amount"
              label="Amount"
              prepend-icon="euro_symbol"
              required
            ></v-text-field>

            <v-flex>
              <v-menu
                ref="menuDate"
                :close-on-content-click="false"
                v-model="menuDate"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="movement.date"
                  :rules="rules.date"
                  label="Select date"
                  prepend-icon="event"
                  readonly
                  required
                ></v-text-field>
                <v-date-picker v-model="movement.date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menuDate = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.menuDate.save(movement.date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>

            <v-select
              :items="accounts"
              item-value="id"
              item-text="name"
              v-model="movement.accountId"
              :rules="rules.account"
              label="Select account"
              prepend-icon="account_balance"
              required
            ></v-select>

            <v-select
              :items="categories"
              item-value="id"
              item-text="name"
              v-model="movement.categoryId"
              :rules="rules.category"
              label="Select category"
              prepend-icon="label"
              required
            ></v-select>

            <v-select
              :items="tagItems"
              v-model="tags"
              label="Select tags"
              chips
              multiple
              prepend-icon="local_offer"
            ></v-select>

          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { MovementManager } from '@/models/Movement'
import { Category } from '@/models/Category'
import { mapActions } from 'vuex'
import _ from 'lodash/collection'

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export default {
  name: 'MovementForm',
  props: {
    opened: Boolean,
    movement: Object,
    accounts: Array,
    categories: Array
  },
  data () {
    return {
      valid: false,
      menuDate: false,
      rules: {
        description: [
          v => !!v || 'Description is required',
          v => (v && v.length <= 50) || 'Description must be less than 30 characters'
        ],
        amount: [
          v => !!v || 'Amount is required',
          v => (v && isNumber(v)) || 'Amount must be a valid number'
        ],
        type: [
          v => !!v || 'Type is required'
        ],
        date: [
          v => !!v || 'Date is required',
          v => !!Date.parse(v) || 'Date must be a valid date format YYYY-MM-DD'
        ],
        account: [
          v => !!v || 'Select an account'
        ],
        category: [
          v => !!v || 'Select an category'
        ]
      }
    }
  },
  computed: {
    tagItems () {
      if (this.movement.categoryId !== undefined) {
        return Category.tagToArray(_.find(this.categories, { 'id': this.movement.categoryId }).tags)
      } else {
        return []
      }
    },
    tags: {
      get () {
        return Category.tagToArray(this.movement.tags)
      },
      set (value) {
        this.movement.tags = Category.tagToObject(value)
      }
    }
  },
  methods: {
    close: function () {
      this.$emit('form-closed', false)
    },
    save: async function () {
      if (this.$refs.form.validate()) {
        this.removeInvalidTags()

        MovementManager
          .save(MovementManager.getModelInstance(this.movement).toObject(), this.movement.id)
          .then(() => {
            this.addMessage({text: `Movement "${this.movement.description}" saved`, type: 'success'})
            this.close()
          })
      }
    },
    ...mapActions('messages', ['addMessage']),
    removeInvalidTags () {
      const categoryTags = _.find(this.categories, { 'id': this.movement.categoryId }).tags
      for (const tag in this.movement.tags) {
        if (!categoryTags[tag]) {
          delete this.movement.tags[tag]
        }
      }
    }
  }
}
</script>
