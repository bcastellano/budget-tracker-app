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
              v-model="movement.description"
              :rules="descriptionRules"
              :counter="30"
              label="Description"
              prepend-icon="description"
              required
            ></v-text-field>

            <v-text-field
              v-model="movement.amount"
              label="Amount"
              prepend-icon="euro_symbol"
              required
            ></v-text-field>

            <v-select
              :items="types"
              v-model="movement.type"
              label="Select type"
              prepend-icon="ballot"
            ></v-select>

            <v-flex>
              <v-menu
                ref="menuDate"
                :close-on-content-click="true"
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
                  label="Select date"
                  prepend-icon="event"
                  readonly
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
              label="Select account"
              prepend-icon="account_balance"
            ></v-select>

            <v-select
              :items="categories"
              item-value="id"
              item-text="name"
              v-model="movement.categoryId"
              label="Select category"
              prepend-icon="label"
            ></v-select>

          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { MovementManager } from '@/models/Movement'
import { mapActions } from 'vuex'

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
      types: ['expense', 'income'],
      descriptionRules: [
        v => !!v || 'Description is required',
        v => (v && v.length <= 30) || 'Description must be less than 30 characters'
      ]
    }
  },
  methods: {
    close: function () {
      this.$emit('form-closed', false)
    },
    save: async function () {
      if (this.$refs.form.validate()) {
        const doc = Object.assign({ userId: this.$store.getters['auth/user'].uid }, this.movement)

        MovementManager
          .save(MovementManager.getModelInstance(doc).toObject(), this.movement.id)
          .then(() => {
            this.addMessage({text: `Movement "${doc.name}" saved`, type: 'success'})
            this.close()
          })
      }
    },
    ...mapActions('messages', ['addMessage'])
  }
}
</script>
