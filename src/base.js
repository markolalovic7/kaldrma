import Rebase from "re-base";
import firebase from "firebase";
// import { useRouteMatch } from "react-router-dom";
// import { userRef } from "react";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAFgSGaxcRwa-FtNfyLv5KMDQ2KvG7TZLI",
  authDomain: "kaldrma-9df71.firebaseapp.com",
  projectId: "kaldrma-9df71",
  storageBucket: "kaldrma-9df71.appspot.com",
  messagingSenderId: "673351708862",
  appId: "1:673351708862:web:87c779e48e3c3ecdbaeeef",
  measurementId: "G-L97Q9MJ07E"
})

/* For Realtime DB */
const base = Rebase.createClass(firebaseApp.database());
/* For Realtime DB */


/* For Auth google sign In */
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider);
/* For Auth google sign In */


/* For Realtime DB */
export { firebaseApp };
export default base;
/* For Realtime DB */

export const handleUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const { uid } = userAuth;

  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exist) {
    const { displayName, email } = userAuth;
    const timestamp = new Date();
    //const userRoles = ['user'];
    try {
      await userRef.set({
        displayName,
        email,
        createDate: timestamp,
        ...additionalData
        //userRoles,
      });

    } catch (error) {
      //console.log(error)
    }
  }
  return userRef;
};

// export const getCurrentUser = () => {
//   return new Promise((resolve, reject) => {
//     const unsubscribe = auth.onAuthStateChanged(userAuth => {
//       unsubscribe();
//       resolve(userAuth);
//     }, reject);
//   })
// }
