import { initializeApp } from "firebase/app";

import { 
    getAuth 
} from "firebase/auth";

import { 
    getFirestore 
} from "firebase/firestore";

import {
    getStorage
} from "firebase/storage";


const firebaseConfig = {

    apiKey: "AIzaSyDhLWkGADcDwYEDyE8UXvTX_c0jswakgm0",

    authDomain: "loops-and-love.firebaseapp.com",

    projectId: "loops-and-love",

    storageBucket: "loops-and-love.firebasestorage.app",

    messagingSenderId: "1007705947918",

    appId: "1:1007705947918:web:921e8e9056c9ba23d6e15f"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);


// Firebase Services

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);



export {
    app,
    auth,
    db,
    storage
};