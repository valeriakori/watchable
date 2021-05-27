import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBO62ttqzEcnYUwb_QzzsQzLtGb7vaWqks",
  authDomain: "bce-movie-app.firebaseapp.com",
  projectId: "bce-movie-app",
  storageBucket: "bce-movie-app.appspot.com",
  messagingSenderId: "115002206149",
  appId: "1:115002206149:web:5f0b831ac2a9e64699cdac",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
