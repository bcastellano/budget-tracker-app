<template>
  <div class="accounts">
    <h1>Accounts</h1>

    <AccountList :list="accountList" />
  </div>
</template>

<script>
import AccountList from '@/components/Accounts/List'
import {AccountManager} from '@/models/Account'

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
    AccountManager.list().then(list => {
      if (list) {
        this.accountList = list
      }
    })
  }
}
</script>
