import firebase from 'firebase'

const config ={
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "read-later-46541.firebaseapp.com",
    databaseURL: "https://read-later-46541.firebaseio.com",
    projectId: "read-later-46541",
    storageBucket: "read-later-46541.appspot.com",
    messagingSenderId: "7434623786",
    appId: "1:7434623786:web:329fa43e0b87aa53ee5c53",
    measurementId: "G-FNWGSHBCX9"
  };
  // Initialize Firebase
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;