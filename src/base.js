import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAFgSGaxcRwa-FtNfyLv5KMDQ2KvG7TZLI",
  authDomain: "kaldrma-9df71.firebaseapp.com",
  projectId: "kaldrma-9df71",
  storageBucket: "kaldrma-9df71.appspot.com",
  messagingSenderId: "673351708862",
  appId: "1:673351708862:web:87c779e48e3c3ecdbaeeef",
  measurementId: "G-L97Q9MJ07E"
})

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;