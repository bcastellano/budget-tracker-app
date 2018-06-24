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
              disabled
            ></v-text-field>

            <v-text-field
              v-model="category.name"
              :rules="nameRules"
              :counter="30"
              label="Name"
              required
            ></v-text-field>

          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { CategoryManager } from '@/models/Category'
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
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 30) || 'Name must be less than 30 characters'
      ]
    }
  },
  methods: {
    close: function () {
      this.$emit('form-closed', false)
    },
    save: async function () {
      if (this.$refs.form.validate()) {
        const doc = {
          name: this.category.name,
          userId: this.$store.getters['auth/user'].uid
        }

        CategoryManager
          .save(CategoryManager.getModelInstance(doc).toObject(), this.category.id)
          .then(() => {
            this.addMessage({text: `Category "${doc.name}" saved`, type: 'success'})
            this.close()
          })
      }
    },
    ...mapActions('messages', ['addMessage'])
  }
}
</script>
