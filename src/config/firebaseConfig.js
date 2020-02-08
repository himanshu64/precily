import firebase from 'firebase';

//import dotEnv from 'dotenv';
var firebaseConfig = {
    apiKey: "AIzaSyCB6ApUnzp6yRHjke8PM-mNUSBFfyaHapU",
    authDomain: "sampleapp-b0d00.firebaseapp.com",
    databaseURL: "https://sampleapp-b0d00.firebaseio.com",
    projectId: "sampleapp-b0d00",
    storageBucket: "sampleapp-b0d00.appspot.com",
    messagingSenderId: "118698460055",
    appId: "1:118698460055:web:31736d65e4b33307717ad2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;
 