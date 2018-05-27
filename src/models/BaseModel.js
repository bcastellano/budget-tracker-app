export default class BaseModel {
  constructor () {
    this.createdAt = new Date()
  }

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

    return obj
  }
}
