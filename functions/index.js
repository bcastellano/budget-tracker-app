const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

/**
 * Triggers any movement
 */
exports.createMovement = functions.firestore
  .document('movements/{id}')
  .onCreate((snap, context) => {
    // Get an object representing the document
    const movement = snap.data()

    console.log('Creating movement ', context.params.id, movement)

    let amount = movement.amount
    if (movement.type === 'expense') {
      amount = (amount * -1)
    }
    console.log('Amount ', amount);

    const balance = {balance: {account: amount}}

    console.log('Updating user ', movement.userId)

    return admin.firestore()
      .collection('users')
      .doc(movement.userId)
      .set(balance, {merge: true})
  })
