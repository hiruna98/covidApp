import * as firebase from "firebase";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAC5JGBV7ecGezuQyac55sJPu6qi4SypvA",

  authDomain: "covidapp-6d2cf.firebaseapp.com",

  projectId: "covidapp-6d2cf",

  storageBucket: "covidapp-6d2cf.appspot.com",

  messagingSenderId: "1062418920075",

  appId: "1:1062418920075:web:37368ba406d3aaf8535a8e",
};
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

export const database = app.firestore();
