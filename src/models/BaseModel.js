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

    // add created at in creation mode
    if (this.$isNew()) {
      obj.createdAt = firebase.firestore.FieldValue.serverTimestamp()
    }

    return obj
  }

  /**
   * Return if instance is new object or existing one
   */
  $isNew () {
    return !this.id
  }
}
