<template>
  <v-layout row>
    <v-flex>
      <v-card class="pa-3">
        {{list.length}} categories
        <v-layout v-if="list.length == 0" row wrap>
          <v-flex xs12 text-xs-center>
            <span>
              <v-icon medium>info</v-icon> list is empty, create a category
              <v-btn flat icon color="primary" @click="openForm()">
                <v-icon>add</v-icon>
              </v-btn>
            </span>
          </v-flex>
        </v-layout>

        <v-list v-if="list.length > 0">
          <v-list-tile v-for="category in list" :key="category.name" @click="openForm(category)">
            <v-list-tile-action>
              <v-icon :style="{ 'color': category.color }">{{category.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="category.name"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-btn color="primary" absolute top right fab @click.stop="openForm()">
          <v-icon>add</v-icon>
        </v-btn>
      </v-card>

      <CategoryForm :opened="formOpened" :category="categoryData" v-on:form-closed="closeForm($event)" />
    </v-flex>
  </v-layout>
</template>

<script>
import CategoryForm from './Form'
import {CategoryManager} from '@/models/Category'

export default {
  name: 'CategoryList',
  components: {
    CategoryForm
  },
  data () {
    return {
      formOpened: false,
      categoryData: {},
      list: []
    }
  },
  firestore () {
    return {
      list: CategoryManager.listRealtime()
    }
  },
  methods: {
    openForm: function (category) {
      this.categoryData = Object.assign(category ? {id: category.id} : {}, category)
      this.formOpened = true
    },
    closeForm: function (event) {
      this.categoryData = {}
      this.formOpened = false
    }
  }
}
</script>

<style scoped lang="scss">
</style>
