<template>
  <div class="categories">
    <h1>Categories</h1>

    <CategoriesList />
  </div>
</template>

<script>
import CategoriesList from '@/components/Categories/List'

export default {
  name: 'categories',
  components: {
    CategoriesList
  }
}
</script>
