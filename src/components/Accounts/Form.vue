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

          <v-form v-model="valid">
            <v-text-field
              v-model="name"
              :rules="nameRules"
              :counter="30"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="initialBalance"
              :rules="initialBalanceRules"
              label="Initial balance"
              required
            ></v-text-field>

            <v-select :items="colors" v-model="color" label="Select">
              <template slot="selection" slot-scope="data">
                <v-list-tile-title :style="{ 'background-color': data.item.hex}"></v-list-tile-title>
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

export default {
  name: 'AccountForm',
  props: {
    opened: Boolean
  },
  data () {
    return {
      name: '',
      initialBalance: '',
      color: null,
      valid: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 30 || 'Name must be less than 30 characters'
      ],
      initialBalanceRules: [
        v => !!v || 'Initial balance is required',
        v => /[0-9]|\./.test(v) || 'Initial balance must be valid number'
      ],
      colors: []
    }
  },
  methods: {
    close: function () {
      this.$emit('form-closed', false)
    },
    save: function () {
      const doc = {
        name: this.name,
        initialBalance: this.initialBalance,
        color: this.color.hex,
        colorText: this.calculateTextColor(this.color.name)
      }
      console.log(doc)
      this.$emit('form-closed', false)
    },
    calculateTextColor: function (colorName) {
      return (colorName.startsWith('lighten') || colorName === 'white' ? 'black' : 'white')
    }
  },
  created: function () {
    for (const colorGroup in colors) {
      for (const colorKey in colors[colorGroup]) {
        this.colors.push({hex: colors[colorGroup][colorKey], name: colorKey})
      }
    }
  }
}
</script>
