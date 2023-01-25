import { initializeApp } from 'firebase/app'
import {
  getAuth,
  onAuthStateChanged as onFirebaseAuthStateChanged,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import { TwitterAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDUO1FRwvgPlTur3e0prtY1U9i9sV4Oxdc",
  authDomain: "eng-quiz-87219.firebaseapp.com",
  databaseURL: "https://eng-quiz-87219-default-rtdb.firebaseio.com",
  projectId: "eng-quiz-87219",
  storageBucket: "eng-quiz-87219.appspot.com",
  messagingSenderId: "398588387168",
  appId: "1:398588387168:web:77593c9c68f0c701864805",
  measurementId: "G-699H29WNT5",
}



export const app = initializeApp(firebaseConfig)
// export const analytics = getAnalytics(app)
export const db = getFirestore(app)

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const twitterProvider = new TwitterAuthProvider()

// ログイン処理
export const TwitterLogin = () => {
  const auth = getAuth(app)
  signInWithPopup(auth, twitterProvider).then( async (result) => {
    const credential = TwitterAuthProvider.credentialFromResult(result)
    if (credential) {
      const token = credential.accessToken
      const secret = credential.secret
      const user = result.user
    }
  }).catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
    const email = error.email
    const credential = TwitterAuthProvider.credentialFromError(error)
  })
}

// ログアウト処理
export const logout = () =>
  new Promise((resolve, reject) => {
    const auth = getAuth(app)
    signOut(auth)
      .then(() => resolve(""))
      .catch((error) => reject(error))
  })

// ログイン検知
export const onAuthStateChanged = (callback: any) => {
  const auth = getAuth(app)
  onFirebaseAuthStateChanged(auth, (user) => {
    const userInfo = user
      ? {
        uid: user.uid,
      }
      : null
    callback(userInfo)
  })
}

export const Today = () => {
  var now = new Date()
  var Datetime = String(now.getDate())
  return Datetime
}

export const Day = () => {
  var now = new Date()
  var Datetime = String(now.getDate())
  return Datetime
}
