<template>
  <div>
    <v-dialog v-model="opened" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click.native="close">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Category</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="save">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-if="category.id"
              v-model="category.id"
              label="Id"
              prepend-icon="fingerprint"
              disabled
            ></v-text-field>

            <v-text-field
              v-model.trim="category.name"
              :rules="rules.name"
              :counter="30"
              label="Name"
              prepend-icon="description"
              required
            ></v-text-field>

            <v-layout row wrap>
              <v-flex xs3>
                <v-text-field
                  v-model="category.icon"
                  :rules="rules.icon"
                  label="Icon"
                  prepend-icon="insert_photo"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-btn outline @click.stop="iconsDialog=true">choose</v-btn>
              </v-flex>

              <v-dialog v-model="iconsDialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    Choose icon
                  </v-card-title>
                  <v-card-text>
                    <v-icon
                      class="ma-3"
                      v-for="icon in icons"
                      :key="icon"
                      x-large
                      @click="category.icon=icon;iconsDialog=false"
                      style="cursor:pointer"
                    >{{icon}}</v-icon>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="primary" flat @click.stop="iconsDialog=false">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>

            <v-select
              :items="backgroundColors"
              item-value="hex"
              v-model="category.color"
              :rules="rules.color"
              label="Select color"
              prepend-icon="border_color"
              required
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

            <v-select
              v-model="tags"
              label="Tags"
              chips
              tags
              deletable-chips
              prepend-icon="local_offer"
              ref="tags"
            ></v-select>

          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import colors from 'vuetify/es5/util/colors'
import { Category, CategoryManager } from '@/models/Category'
import { mapActions } from 'vuex'

export default {
  name: 'CategoryForm',
  props: {
    opened: Boolean,
    category: Object
  },
  data () {
    return {
      valid: false,
      rules: {
        name: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 30) || 'Name must be less than 30 characters'
        ],
        icon: [
          v => !!v || 'Icon is required'
        ],
        color: [
          v => !!v || 'Color is required'
        ]
      },
      backgroundColors: [],
      icons: [
        'account_balance', 'account_balance_wallet', 'android', 'assessment', 'book', 'build', 'card_giftcard', 'card_travel', 'commute', 'dns', 'flight_takeoff', 'home', 'pets', 'shop', 'shopping_cart'
      ],
      iconsDialog: false
    }
  },
  computed: {
    tags: {
      get () {
        return Category.tagToArray(this.category.tags)
      },
      set (value) {
        this.category.tags = Category.tagToObject(value)
      }
    }
  },
  methods: {
    close: function () {
      this.$emit('form-closed', false)
      this.tags = []
    },
    save: async function () {
      if (this.$refs.form.validate()) {
        CategoryManager
          .save(CategoryManager.getModelInstance(this.category).toObject(), this.category.id)
          .then(() => {
            this.addMessage({text: `Category "${this.category.name}" saved`, type: 'success'})
            this.close()
          })
      }
    },
    calculateTextColor: function (colorName) {
      return (!colorName || colorName.startsWith('lighten') || colorName === 'white' ? 'black' : 'white')
    },
    ...mapActions('messages', ['addMessage'])
  },
  created: function () {
    // set background colors
    for (const colorGroup in colors) {
      this.backgroundColors.push({hex: colors[colorGroup]['base'], name: colorGroup})
    }
  }
}
</script>
