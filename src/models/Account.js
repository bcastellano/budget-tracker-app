import BaseModel from '@/models/BaseModel'
import BaseManager from '@/models/BaseManager'

/**
 * Account item from accounts collection
 */
export class Account extends BaseModel {
  constructor (obj) {
    super()
    this.id = obj.id
    this.name = obj.name
    this.initialBalance = obj.initialBalance
    this.color = obj.color
    this.userId = obj.userId
    this.image = obj.image || null
    this.createdAt = obj.createdAt
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
    return new Account(obj)
  }
}

export const AccountManager = new AccountModelManager()
