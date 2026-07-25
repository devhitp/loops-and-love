// Import Firebase App
import { initializeApp } from "firebase/app";

// Firebase configuration
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

// Export Firebase App
export default app;