<template>
  <div>
    <v-dialog v-model="opened" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click.native="close">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Account</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="save">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-if="account.id"
              v-model="account.id"
              label="Id"
              prepend-icon="fingerprint"
              disabled
            ></v-text-field>

            <div>
              <img :src="account.image" @click="$refs.fileInput.click()">
              <input ref="fileInput" type="file" @change="handleFileChange" accept="image/*" />
            </div>

            <v-text-field
              v-model="account.name"
              :rules="nameRules"
              :counter="30"
              label="Name"
              prepend-icon="description"
              required
            ></v-text-field>

            <v-text-field
              v-model="account.initialBalance"
              :rules="initialBalanceRules"
              label="Initial balance"
              prepend-icon="euro_symbol"
              required
            ></v-text-field>

            <v-select
              :items="backgroundColors"
              item-value="hex"
              v-model="account.color"
              label="Select color"
              prepend-icon="border_color"
            >
              <template slot="selection" slot-scope="data">
                <v-list-tile-title
                  v-text="data.item.name"
                  :style="{ 'background-color': data.item.hex, 'color': calculateTextColor(data.item.name) }"
                ></v-list-tile-title>
              </template>
              <template slot="item" slot-scope="data">
                <v-list-tile-title
                  v-text="data.item.name"
                  :style="{ 'background-color': data.item.hex, 'color': calculateTextColor(data.item.name) }"
                ></v-list-tile-title>
              </template>
            </v-select>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import colors from 'vuetify/es5/util/colors'
import { AccountManager } from '@/models/Account'
import { mapActions } from 'vuex'
import { storage } from '@/helpers/firebaseConfig'

export default {
  name: 'AccountForm',
  props: {
    opened: Boolean,
    account: Object
  },
  data () {
    return {
      valid: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 30) || 'Name must be less than 30 characters'
      ],
      initialBalanceRules: [
        v => !!v || 'Initial balance is required',
        v => /[0-9]|\./.test(v) || 'Initial balance must be valid number'
      ],
      backgroundColors: [],
      imageFile: null
    }
  },
  methods: {
    close: function () {
      this.$emit('form-closed', false)
      this.$refs.fileInput.value = ''
    },
    save: async function () {
      if (this.$refs.form.validate()) {
        // is new object, create objref to get id
        if (!this.account.id) {
          this.account.id = AccountManager.newRef().id
        }

        const userId = this.$store.getters['auth/user'].uid

        if (this.imageFile) {
          const ref = storage.ref().child(`user/${userId}/accounts/${this.account.id}`)
          await ref.put(this.imageFile)
          this.account.image = await ref.getDownloadURL()
        }

        AccountManager
          .save(AccountManager.getModelInstance(this.account).toObject(), this.account.id)
          .then(() => {
            this.addMessage({text: `Account "${this.account.name}" saved`, type: 'success'})
            this.close()
          })
      }
    },
    handleFileChange: function (e) {
      this.imageFile = e.target.files[0]
    },
    calculateTextColor: function (colorName) {
      return (!colorName || colorName.startsWith('lighten') || colorName === 'white' ? 'black' : 'white')
    },
    ...mapActions('messages', ['addMessage'])
  },
  created: function () {
    // set background colors
    for (const colorGroup in colors) {
      for (const colorKey in colors[colorGroup]) {
        this.backgroundColors.push({hex: colors[colorGroup][colorKey], name: colorKey})
      }
    }
  }
}
</script>
