'use strict'

const { db } = require('../firebase')

/**
 * Movements utils
 */
exports.MovementManager = {

  /**
   * Get balance for specified user
   */
  userBalance: function(userId, dateStart, dateEnd) {
    console.log('Updating user balance', userId, dateStart, dateEnd)

    var query = db.collection('movements')
      .where('userId', '==', userId)
      .where('date', '>=', dateStart)
      .where('date', '<=', dateEnd)

    return query.get()
      .then((querySnapshot) => {
        let response = {
          total: 0,
          ntrans: 0,
          accounts: {},
          categories: {},
          tags: {}
        }

        querySnapshot.forEach((doc) => {
          const move = doc.data()
          const amount = (move.type === 'expense' ? move.amount * -1 : move.amount)
          response.ntrans++
          response.total += amount
          response.accounts[move.accountId] = amount + (response.accounts[move.accountId] || 0)
          response.categories[move.categoryId] = amount + (response.categories[move.categoryId] || 0)
          for (const key in move.tags) {
            if (move.tags.hasOwnProperty(key)) {
              response.tags[key] = amount + (response.tags[key] || 0)
            }
          }
        })

        console.log(response)

        return response
      })
      .catch((error) => {
        console.log("Error getting documents: ", error)
      })
  }
}