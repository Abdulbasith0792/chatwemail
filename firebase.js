import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAqC9FUQDc_uB2QQuq75SY1tOlZk9dtjpk",
    authDomain: "whatsapp-clone-5c4f1.firebaseapp.com",
    projectId: "whatsapp-clone-5c4f1",
    storageBucket: "whatsapp-clone-5c4f1.appspot.com",
    messagingSenderId: "357818404308",
    appId: "1:357818404308:web:e1731d5ab2acee51189a41"
  };

    const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig) 
    : firebase.app();

    const db = app.firestore();
    const auth = app.auth();
    const provider = new firebase.auth.GoogleAuthProvider();

    export {db, auth, provider}