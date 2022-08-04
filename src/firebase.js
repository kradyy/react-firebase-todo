import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC9mWa5muLTru4jmabhL5ycJKu2LVqfqxY",
    authDomain: "todo-app-cp-bb5aa.firebaseapp.com",
    projectId: "todo-app-cp-bb5aa",
    storageBucket: "todo-app-cp-bb5aa.appspot.com",
    messagingSenderId: "793646220660",
    appId: "1:793646220660:web:4e462cedc125c606a95821",
    measurementId: "G-0Y7HJX0YK2"
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = firebase.auth();

export { db, auth }