import { db } from '@/helpers/firebaseConfig'

export default class BaseManager {
  constructor (collection) {
    this.collection = collection
  }

  /**
   * Get user from collection with UID
   * @param {string} id UID identifier
   */
  async get (id) {
    const user = await db.collection(this.collection)
      .doc(id)
      .get()
      .then(doc => {
        this.log('Document retrieved successfully', doc)
        return doc.data()
      })

    return user
  }

  /**
   * Create or update an object
   * @param {object} obj Plain object
   * @param {string} id Optional
   */
  save (obj, id) {
    let successFn = (docRef) => {
      if (docRef) {
        this.log('Document written with ID: ', docRef)
      } else {
        this.log('Document written successfully')
      }
    }

    let errorFn = function (error) {
      console.error('Error adding document: ', error)
    }

    if (id) {
      db.collection(this.collection)
        .doc(id)
        .set(obj)
        .then(successFn)
        .catch(errorFn)
    } else {
      db.collection(this.collection)
        .add(obj)
        .then(successFn)
        .catch(errorFn)
    }
  }

  log (...messages) {
    console.log('%cdatabase', `background: green; color: white; padding: 2px 0.5em; border-radius: 0.5em;`, ...messages)
  }
}