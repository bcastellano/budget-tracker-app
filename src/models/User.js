import BaseModel from '@/models/BaseModel'
import BaseManager from '@/models/BaseManager'

/**
 * User item from users collection
 */
export class User extends BaseModel {
  constructor (firebaseUser) {
    super()
    this.id = firebaseUser.uid
    this.name = firebaseUser.displayName
    this.email = firebaseUser.email
    this.providerId = firebaseUser.providerId
  }
}

/**
 * Users manager class
 */
class UserModelManager extends BaseManager {
  constructor () {
    super('users')
  }
}

export const UserManager = new UserModelManager()
