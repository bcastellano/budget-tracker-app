import BaseModel from '@/models/BaseModel'
import BaseManager from '@/models/BaseManager'

/**
 * Category item from categories collection
 */
export class Category extends BaseModel {
  constructor (obj) {
    super()
    this.id = obj.id
    this.name = obj.name
    this.userId = obj.userId
    if (obj.createdAt) {
      this.createdAt = obj.createdAt.seconds
    }
  }
}

/**
 * Categories manager class
 */
class CategoryModelManager extends BaseManager {
  constructor () {
    super('categories')
  }

  getModelInstance (obj) {
    return new Category(obj)
  }
}

export const CategoryManager = new CategoryModelManager()
