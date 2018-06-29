import firebase from '@firebase/app'

export default class BaseModel {
  /**
   * Convert this Object class into plain object with its properties
   */
  toObject () {
    const obj = {}
    Object.keys(this).forEach(key => {
      if (key !== 'id') {
        obj[key] = this[key]
      }
    })

    // add created at in if not exists (object is new)
    if (!this.createdAt) {
      obj.createdAt = firebase.firestore.FieldValue.serverTimestamp()
    }

    // always add updated at
    obj.updatedAt = firebase.firestore.FieldValue.serverTimestamp()

    return obj
  }
}
