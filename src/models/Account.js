import BaseModel from '@/models/BaseModel'
import BaseManager from '@/models/BaseManager'
import store from '@/store'

/**
 * Account item from accounts collection
 */
export class Account extends BaseModel {
  constructor (obj) {
    super()
    this.id = obj.id
    this.name = obj.name
    this.initialBalance = parseFloat(obj.initialBalance)
    this.color = obj.color
    this.image = obj.image || null
    this.createdAt = obj.createdAt
    this.userId = obj.userId || store.getters['auth/user'].uid
  }
}

/**
 * Accounts manager class
 */
class AccountModelManager extends BaseManager {
  constructor () {
    super('accounts')
  }

  getModelInstance (obj) {
    return new Account(Object.assign({}, obj))
  }

  /**
   * Get list of documents for realtime
   */
  listRealtime () {
    return super.listRealtime()
      .orderBy('name', 'asc')
  }
}

export const AccountManager = new AccountModelManager()
