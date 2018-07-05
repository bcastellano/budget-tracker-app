'use strict'

const { functions } = require('../firebase')
const UserManager = require('../models/UserManager')

/**
 * Trigger: movement create
 */
exports.createMovement = functions.firestore
  .document('movements/{id}')
  .onCreate((snap, context) => {
    // Get an object representing the document
    const movement = snap.data()

    console.log('Created movement ', context.params.id, movement)

    const operations = {}
    let amount = movement.amount
    if (movement.type === 'expense') {
      amount = (amount * -1)
    }
    operations[movement.accountId] = { value: amount, ntrans: 1 }

    return UserManager.updateBalance(movement.userId, operations)
  })

/**
 * Trigger: movement update
 */
exports.updateMovement = functions.firestore
  .document('movements/{id}')
  .onUpdate((change, context) => {
    // Get an object representing the document
    const newDoc = change.after.data()

    // the previous value before this update
    const oldDoc = change.before.data()

    console.log('Updated movement', context.params.id, newDoc)

    let oldAmount = oldDoc.amount
    if (oldDoc.type !== 'expense') {
      oldAmount = (oldAmount * -1)
    }
    let newAmount = newDoc.amount
    if (newDoc.type === 'expense') {
      newAmount = (newAmount * -1)
    }

    const operations = {}
    if (oldDoc.accountId === newDoc.accountId) {
      operations[newDoc.accountId] = { value: oldAmount + newAmount, ntrans: 0 }
    } else {
      operations[oldDoc.accountId] = { value: oldAmount, ntrans: -1 }
      operations[newDoc.accountId] = { value: newAmount, ntrans: 1 }
    }

    return UserManager.updateBalance(newDoc.userId, operations)
  })

/**
 * Trigger: movement delete
 */
exports.deleteMovement = functions.firestore
  .document('movements/{id}')
  .onDelete((snap, context) => {
    // Get an object representing the document prior to deletion
    const deletedValue = snap.data()

    console.log('Delete movement', context.params.id, deletedValue)

    let amount = deletedValue.amount
    if (deletedValue.type !== 'expense') {
      amount = (amount * -1)
    }

    const operations = {}
    operations[deletedValue.accountId] = { value: amount, ntrans: -1 }

    return UserManager.updateBalance(deletedValue.userId, operations)
  })
