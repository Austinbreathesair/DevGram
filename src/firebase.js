import { firebase } from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'

// firebase init
const firebaseConfig = {
  apiKey: "AIzaSyCr18aPgRpRjiJewfcrZs-wpSwsVdbiUaU",
  authDomain: "devgram-b263f.firebaseapp.com",
  projectId: "devgram-b263f",
  storageBucket: "devgram-b263f.appspot.com",
  messagingSenderId: "119486377289",
  appId: "1:119486377289:web:0011a7f2a0b38f14207e98"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
}
