
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import {
    getAuth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBWVFf45aF4CTnja3Lfb4CaVgtKfIGAi9Q",
    authDomain: "realtimechatappbyquang.firebaseapp.com",
    databaseURL: "https://realtimechatappbyquang-default-rtdb.firebaseio.com",
    projectId: "realtimechatappbyquang",
    storageBucket: "realtimechatappbyquang.appspot.com",
    messagingSenderId: "72178842656",
    appId: "1:72178842656:web:e8fa1f396eacecd01b1045",
    measurementId: "G-N3XF7N933T"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firebaseDatabase = getDatabase(app);
const auth = getAuth(app)
const storage = getStorage(app)
export {
    app, firebaseDatabase, analytics, auth, storage
    ,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
};