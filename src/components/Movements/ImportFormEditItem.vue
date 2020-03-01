<template>
  <div>
    <v-card tile>
      Item {{ movementPosition+1 }}/{{ movementList.length }}
      <v-card-text>
        <div v-if="movement === null">No movements</div>

        <v-form v-if="movement" ref="form" v-model="editItemValid">
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

      <v-btn color="primary" @click.native="prevPosition" :disabled="movementPosition==0"><v-icon>chevron_left</v-icon></v-btn>
      <v-btn color="primary" @click.native="nextPosition" v-if="movementPosition!==movementList.length-1"><v-icon>chevron_right</v-icon></v-btn>
      <v-btn color="primary" @click.native="dataCompleted" v-if="movementPosition===movementList.length-1">continue <v-icon>chevron_right</v-icon></v-btn>
    </v-card>
  </div>
</template>

<script>
import { Category } from '@/models/Category'
import { mapActions } from 'vuex'
import _ from 'lodash/collection'

function isNumber (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

export default {
  name: 'MovementImportFormEditItem',
  props: {
    movementList: Array,
    accounts: Array,
    categories: Array
  },
  data () {
    return {
      movementPosition: 0,
      editItemValid: false,
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
    },
    movement () {
      return this.movementList[this.movementPosition]
    }
  },
  methods: {
    nextPosition: function () {
      if (this.$refs.form.validate()) {
        const nextPosition = this.movementPosition + 1
        if (this.movementList.length > nextPosition) {
          this.movementPosition = nextPosition
          this.removeInvalidTags()
        }
      }
    },
    prevPosition: function () {
      if (this.$refs.form.validate()) {
        const prevPosition = this.movementPosition - 1
        if (prevPosition >= 0) {
          this.movementPosition = prevPosition
          this.removeInvalidTags()
        }
      }
    },
    dataCompleted: function () {
      if (this.$refs.form.validate()) {
        this.$emit('data-completed', true)
      }
    },
    ...mapActions('messages', ['addMessage']),
    removeInvalidTags () {
      if (this.movement.categoryId !== undefined) {
        const categoryTags = _.find(this.categories, { 'id': this.movement.categoryId }).tags
        for (const tag in this.movement.tags) {
          if (!categoryTags[tag]) {
            delete this.movement.tags[tag]
          }
        }
      }
    }
  }
}
</script>
