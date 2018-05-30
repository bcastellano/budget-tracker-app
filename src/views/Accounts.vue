<template>
  <div class="accounts">
    <h1>Accounts</h1>

    <AccountList />
  </div>
</template>

<script>
import AccountList from '@/components/Accounts/List'

export default {
  name: 'accounts',
  components: {
    AccountList
  }
}
</script>
