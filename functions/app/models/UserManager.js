'use strict'

const { db } = require('../firebase')

/**
 * User utils
 */
module.exports = {

  /**
   * Update balance for specified user
   *
   *  operations: {
   *    id1: { value: X, ntrans: 1 },
   *    id2: { value: Y, ntrans: 0 }
   *  }
   */
  updateBalance: function(userId, operations) {
    console.log('Updating user balance', userId, operations)

    var userRef = db.collection('users').doc(userId);

    return db.runTransaction(t => {
        return t.get(userRef)
          .then(doc => {
            const balance = doc.data().balance || {}
            // apply each operation into current user balance
            for (const key in operations) {
              if (operations.hasOwnProperty(key)) {
                const item = operations[key];

                if (balance[key] === undefined) {
                  balance[key] = { value: 0, ntrans: 0 }
                }

                balance[key].value += item.value
                balance[key].ntrans += item.ntrans
              }
            }

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