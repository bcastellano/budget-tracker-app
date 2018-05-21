<template>
  <div class="accounts">
    <h1>Accounts</h1>

    <AccountList :list="accountList" />
  </div>
</template>

<script>
import AccountList from '@/components/Accounts/List'

export default {
  name: 'accounts',
  components: {
    AccountList
  },
  data () {
    return {
      accountList: []
    }
  },
  created () {
    this.accountList = [
      {
        id: 'bank-1',
        name: 'Bank 1',
        color: 'grey',
        colorText: 'white--text',
        amount: 1000,
        icon: 'account_balance'
      },
      {
        id: 'bank-2',
        name: 'Bank 2',
        color: 'grey',
        colorText: 'white--text',
        amount: 2000,
        icon: 'account_balance_wallet'
      }
    ]
  }
}
</script>
