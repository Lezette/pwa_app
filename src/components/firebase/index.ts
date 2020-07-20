import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCBBrETCaeHCz30WMB1WoOKaL_6Gx9Mm1Q',
  authDomain: 'betastore-2f34c.firebaseapp.com',
  databaseURL: 'https://betastore-2f34c.firebaseio.com',
  projectId: 'betastore-2f34c',
  storageBucket: 'betastore-2f34c.appspot.com',
  messagingSenderId: '349262130015',
  appId: '1:349262130015:web:8fd5d0dcfff1a071fde4ea',
}

firebase.initializeApp(firebaseConfig)
const firestore = firebase.firestore()
const auth = firebase.auth
const provider = new firebase.auth.GoogleAuthProvider()

export { firestore, auth, provider }
