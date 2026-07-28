import {
    db
} from "./firebase-config.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    onSnapshot
} from "firebase/firestore";



// ==========================================
// COLLECTION
// ==========================================

const productsCollection =
    collection(db, "products");



// ==========================================
// ADD PRODUCT
// ==========================================

export async function addProduct(product) {

    const docRef =
        await addDoc(
            productsCollection,
            product
        );

    return docRef.id;

}



// ==========================================
// GET PRODUCTS
// ==========================================

export async function getProducts() {

    const snapshot =
        await getDocs(productsCollection);

    return snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));

}

export function listenToProducts(callback) {

    return onSnapshot(
        productsCollection,
        (snapshot) => {

            const products = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));

            callback(products);

        }
    );

}



// ==========================================
// DELETE PRODUCT
// ==========================================

export async function deleteProduct(id) {

    await deleteDoc(

        doc(db, "products", id)

    );

}



// ==========================================
// UPDATE PRODUCT
// ==========================================

export async function updateProduct(id, product) {

    await updateDoc(

        doc(db, "products", id),

        product

    );

}