
import firebase from 'firebase'
import firebaseui from 'firebaseui'

const config = {
  apiKey: process.env.VUE_APP_FIRE_API_KEY,
  authDomain: process.env.VUE_APP_FIRE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIRE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIRE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIRE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIRE_MESSAGING_SENDER_ID
}

const firebaseApp = firebase.initializeApp(config)

export const auth = firebaseApp.auth()
export const authUI = new firebaseui.auth.AuthUI(firebase.auth(firebaseApp))
// export const db = firebaseApp.firestore()
