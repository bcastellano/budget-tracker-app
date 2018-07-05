'use strict'

const { functions } = require('../firebase')
const { UserManager, OperationManager } = require('../models/UserManager')

/**
 * Trigger: movement create
 */
exports.createMovement = functions.firestore
  .document('movements/{id}')
  .onCreate((snap, context) => {
    // Get an object representing the document
    const movement = snap.data()

    console.log('Created movement ', context.params.id, movement)

    const op = new OperationManager()
    let amount = movement.amount
    if (movement.type === 'expense') {
      amount = (amount * -1)
    }
    op.addAccount(movement.accountId, amount, OperationManager.OP_CREATE)
    op.addCategory(movement.categoryId, amount, OperationManager.OP_CREATE)

    return UserManager.updateBalance(movement.userId, op.getOperations())
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

    const op = new OperationManager()
    if (oldDoc.accountId === newDoc.accountId) {
      op.addAccount(newDoc.accountId, oldAmount + newAmount, OperationManager.OP_UPDATE)
    } else {
      op.addAccount(oldDoc.accountId, oldAmount, OperationManager.OP_DELETE)
      op.addAccount(newDoc.accountId, newAmount, OperationManager.OP_CREATE)
    }
    if (oldDoc.categoryId === newDoc.categoryId) {
      op.addCategory(newDoc.categoryId, oldAmount + newAmount, OperationManager.OP_UPDATE)
    } else {
      op.addCategory(oldDoc.categoryId, oldAmount, OperationManager.OP_DELETE)
      op.addCategory(newDoc.categoryId, newAmount, OperationManager.OP_CREATE)
    }

    return UserManager.updateBalance(newDoc.userId, op.getOperations())
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

    const op = new OperationManager()
    op.addAccount(deletedValue.accountId, amount, OperationManager.OP_DELETE)
    op.addCategory(deletedValue.categoryId, amount, OperationManager.OP_DELETE)

    return UserManager.updateBalance(deletedValue.userId, op.getOperations())
  })
