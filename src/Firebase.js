import firebase from 'firebase'

const firebaseConfig = {


    apiKey: "AIzaSyCWH9Uqi2mdhzCCI5TGjkFFnGtw4GkJNAQ",
    authDomain: "ecomm-second.firebaseapp.com",
    databaseURL: "https://ecomm-second.firebaseio.com",
    projectId: "ecomm-second",
    storageBucket: "ecomm-second.appspot.com",
    messagingSenderId: "156222078273",
    appId: "1:156222078273:web:6d756eb8d9eaf1f01db5c0",
    measurementId: "G-K1JGKWLQ84"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()
  const auth = firebase.auth()


  export {db, auth}

