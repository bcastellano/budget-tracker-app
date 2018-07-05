'use strict'

const { db } = require('../firebase')

/**
 * Class to manage operations for user balance
 */
class OperationManager {
  static get OP_CREATE() { return 1 }
  static get OP_UPDATE() { return 0 }
  static get OP_DELETE() { return -1 }

  constructor () {
    this.operations = OperationManager.emptyOperations()
  }

  static emptyOperations () {
    return {
      accounts: {},
      categories: {}
    }
  }

  addAccount (key, value, opType) {
    this.operations.accounts[key] = { value: value, ntrans: opType }
  }

  addCategory (key, value, opType) {
    this.operations.categories[key] = { value: value, ntrans: opType }
  }

  getOperations () {
    return this.operations
  }
}

/**
 * Operations manager utils
 */
exports.OperationManager = OperationManager

/**
 * User utils
 */
exports.UserManager = {

  /**
   * Update balance for specified user
   *
   *  operations: {
   *    accounts: {
   *      id1: { value: X, ntrans: 1 },
   *      id2: { value: Y, ntrans: 0 }
   *    },
   *    categories: {
   *      id3: { value: X, ntrans: 1 },
   *      id4: { value: Y, ntrans: 0 }
   *    }
   *  }
   */
  updateBalance: function(userId, operations) {
    console.log('Updating user balance', userId, operations)

    var userRef = db.collection('users').doc(userId);

    return db.runTransaction(t => {
        return t.get(userRef)
          .then(doc => {
            const balance = doc.data().balance || OperationManager.emptyOperations()
            // apply each operation into current user balance
            var btypes = ['accounts', 'categories']
            btypes.forEach(bt => {
              for (const key in operations[bt]) {
                if (operations[bt].hasOwnProperty(key)) {
                  const item = operations[bt][key];
  
                  if (balance[bt][key] === undefined) {
                    balance[bt][key] = { value: 0, ntrans: 0 }
                  }
  
                  balance[bt][key].value += item.value
                  balance[bt][key].ntrans += item.ntrans
                }
              }
            })

            return t.update(userRef, { balance: balance })
          });
      }).then(result => {
        console.log('Update balance success!')
        return result
      }).catch(err => {
        console.log('Update balance failure:', err)
      })
  }
}