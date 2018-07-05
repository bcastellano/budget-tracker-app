'use strict'

const { functions } = require('../firebase')
const UserManager = require('../models/UserManager')

/**
 * Trigger: account create
 */
exports.createAccount = functions.firestore
  .document('accounts/{id}')
  .onCreate((snap, context) => {
    // Get an object representing the document
    const account = snap.data()

    console.log('Created account ', context.params.id, account)

    const operations = {}
    operations[context.params.id] = { value: account.initialBalance, ntrans: 1 }

    return UserManager.updateBalance(account.userId, operations)
  })

/**
 * Trigger: account update
 */
exports.updateAccount = functions.firestore
  .document('accounts/{id}')
  .onUpdate((change, context) => {
    // Get an object representing the document
    const newDoc = change.after.data()

    // the previous value before this update
    const oldDoc = change.before.data()

    console.log('Updated account', context.params.id, newDoc, oldDoc)

    let oldAmount = oldDoc.initialBalance * -1
    let newAmount = newDoc.initialBalance

    const amount = oldAmount + newAmount
    const operations = {}
    operations[context.params.id] = { value: amount, ntrans: 0 }

    return UserManager.updateBalance(newDoc.userId, operations)
})
