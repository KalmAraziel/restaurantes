import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAOb3O4sSjZRDAPMMwtbsvVgNq1Dse_O2k",
  authDomain: "tenedores-f5416.firebaseapp.com",
  databaseURL: "https://tenedores-f5416.firebaseio.com",
  projectId: "tenedores-f5416",
  storageBucket: "tenedores-f5416.appspot.com",
  messagingSenderId: "977971637503",
  appId: "1:977971637503:web:76fb761c85af7f65fcb0ca",
  measurementId: "G-SC2QFY7Q22"
}; 

export const firebaseApp = firebase.initializeApp(firebaseConfig);


