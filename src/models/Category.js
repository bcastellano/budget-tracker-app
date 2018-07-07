import BaseModel from '@/models/BaseModel'
import BaseManager from '@/models/BaseManager'
import _collection from 'lodash/collection'
import _array from 'lodash/array'
import store from '@/store'

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
    this.tags = obj.tags || null
    this.createdAt = obj.createdAt
    this.userId = obj.userId || store.getters['auth/user'].uid
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
    return new Category(Object.assign({}, obj))
  }
}

export const CategoryManager = new CategoryModelManager()
