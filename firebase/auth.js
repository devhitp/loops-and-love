import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";


import {
    auth
} from "./firebase-config.js";


// LOGIN

export async function loginUser(email, password){

    try {

        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


        return userCredential.user;


    } catch(error){

        throw error;

    }

}



// LOGOUT

export async function logoutUser(){

    await signOut(auth);

}



// CHECK USER

export function checkAuth(callback){

    onAuthStateChanged(
        auth,
        (user)=>{

            callback(user);

        }
    );

}