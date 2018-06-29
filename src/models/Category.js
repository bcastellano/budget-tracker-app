import BaseModel from '@/models/BaseModel'
import BaseManager from '@/models/BaseManager'
import _collection from 'lodash/collection'
import _array from 'lodash/array'

/**
 * Category item from categories collection
 */
export class Category extends BaseModel {
  constructor (obj) {
    super()
    this.id = obj.id
    this.name = obj.name
    this.icon = obj.icon
    this.color = obj.color
    this.tags = obj.tags
    this.userId = obj.userId
    this.createdAt = obj.createdAt
  }

  static tagToArray (tags) {
    return tags ? _collection.map(tags, (v, k) => k) : []
  }

  static tagToObject (tags) {
    return _array.zipObject(tags, _array.fill(Array(tags.length), true))
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
