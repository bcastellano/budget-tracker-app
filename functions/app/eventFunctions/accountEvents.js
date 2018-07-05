'use strict'

const { functions } = require('../firebase')
const { UserManager, OperationManager } = require('../models/UserManager')

/**
 * Trigger: account create
 */
exports.createAccount = functions.firestore
  .document('accounts/{id}')
  .onCreate((snap, context) => {
    // Get an object representing the document
    const account = snap.data()

    console.log('Created account ', context.params.id, account)

    const op = new OperationManager()
    op.addAccount(context.params.id, account.initialBalance, OperationManager.OP_CREATE)

    return UserManager.updateBalance(account.userId, op.getOperations())
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

    const oldAmount = oldDoc.initialBalance * -1
    const newAmount = newDoc.initialBalance
    const amount = oldAmount + newAmount
    
    const op = new OperationManager()
    op.addAccount(context.params.id, amount, OperationManager.OP_UPDATE)

    return UserManager.updateBalance(newDoc.userId, op.getOperations())
})
