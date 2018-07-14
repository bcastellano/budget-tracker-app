import BaseModel from '@/models/BaseModel'
import BaseManager from '@/models/BaseManager'
import { db } from '@/helpers/firebaseConfig'
import store from '@/store'

/**
 * Movement item from movements collection
 */
export class Movement extends BaseModel {
  constructor (obj) {
    super()
    this.id = obj.id
    this.description = obj.description
    this.amount = parseFloat(obj.amount)
    this.type = obj.type
    this.date = obj.date
    this.accountId = obj.accountId
    this.categoryId = obj.categoryId
    this.tags = obj.tags || null
    this.createdAt = obj.createdAt
    this.userId = obj.userId || store.getters['auth/user'].uid
  }
}

/**
 * Movements manager class
 */
class MovementModelManager extends BaseManager {
  constructor () {
    super('movements')
  }

  getModelInstance (obj) {
    return new Movement(Object.assign({}, obj))
  }

  /**
   * Get list of documents for realtime
   */
  listRealtime () {
    return super.listRealtime()
      .orderBy('createdAt', 'desc')
  }

  /**
   * Remove item
   */
  remove (id) {
    db.collection(this.collection).doc(id).delete().then(function () {
      console.log(`Document ${id} removed successfully`)
    }).catch(function (error) {
      console.error('Error removing document: ', error)
    })
  }
}

export const MovementManager = new MovementModelManager()
