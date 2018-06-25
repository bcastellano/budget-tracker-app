<template>
  <div class="movements">
    <h1>Movements</h1>

    <MovementsList />
  </div>
</template>

<script>
import MovementsList from '@/components/Movements/List'

export default {
  name: 'movements',
  components: {
    MovementsList
  }
}
</script>
