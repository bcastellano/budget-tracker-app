import { db, auth } from '@/helpers/firebaseConfig'

export default class BaseManager {
  constructor (collection) {
    this.collection = collection
  }

  /**
   * Get instance of actual manager main model
   * @param {object} obj data
   */
  getModelInstance (obj) {
    throw new Error('This method "getModelInstance" must be overrided')
  }

  /**
   * Retrive list of documents
   */
  async list () {
    const list = await db.collection(this.collection)
      .where('userId', '==', auth.currentUser.uid)
      .get()
      .then(querySnapshot => {
        this.log('Document list retrieved successfully')
        let items = []
        querySnapshot.forEach(doc => {
          items.push(this.getModelInstance({
            id: doc.id,
            ...doc.data()
          }))
        })

        return items
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error)
      })

    return list
  }

  /**
   * Get list of documents for realtime
   */
  listRealtime () {
    const list = db
      .collection(this.collection)
      .where('userId', '==', auth.currentUser.uid)

    return list
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
      return db.collection(this.collection)
        .doc(id)
        .set(obj, {merge: true})
        .then(successFn)
        .catch(errorFn)
    } else {
      return db.collection(this.collection)
        .add(obj)
        .then(successFn)
        .catch(errorFn)
    }
  }

  log (...messages) {
    console.log('%cdatabase', `background: green; color: white; padding: 2px 0.5em; border-radius: 0.5em;`, ...messages)
  }
}
