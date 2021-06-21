import firebase from "firebase/app";

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: process.e,
  authDomain: "letmeask-bf588.firebaseapp.com",
  databaseURL: "https://letmeask-bf588-default-rtdb.firebaseio.com",
  projectId: "letmeask-bf588",
  storageBucket: "letmeask-bf588.appspot.com",
  messagingSenderId: "793820074734",
  appId: "1:793820074734:web:34b1b579b54d9b4c5599ff"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();