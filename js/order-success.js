// ==========================================
// GET ORDER DATA
// ==========================================
console.log("ORDER SUCCESS JS LOADED");
import { db } from "../firebase/firebase-config.js";

import {
    doc,
    getDoc
} from "firebase/firestore";

import {
    getProducts
} from "../firebase/firestore.js";



// ==========================================
// ORDER ID
// ==========================================

const orderId =
    localStorage.getItem(
        "latestOrderId"
    );




// ==========================================
// LOAD ORDER
// ==========================================

async function loadOrder(){


    if(!orderId){

        showOrderNotFound();

        return;

    }



    const orderSnap =
        await getDoc(
            doc(
                db,
                "orders",
                orderId
            )
        );



    if(!orderSnap.exists()){

        showOrderNotFound();

        return;

    }



    const order = {

        id: orderSnap.id,

        ...orderSnap.data()

    };
    console.log("FETCHED ORDER:", order);



    await renderOrder(order);


}




loadOrder();




// ==========================================
// ORDER NOT FOUND
// ==========================================

function showOrderNotFound(){


    const card =
        document.querySelector(
            ".success-card"
        );


    if(!card) return;



    card.innerHTML = `

        <h1>
            Order Not Found
        </h1>


        <p>
            We couldn't find your order details.
        </p>


        <a href="shop.html"
           class="btn btn-primary">

            Continue Shopping

        </a>

    `;

}



// ==========================================
// DISPLAY ORDER
// ==========================================


async function renderOrder(order){


    // ===============================
    // BASIC DETAILS
    // ===============================


    document.querySelector(
        "#order-id"
    ).textContent =
        order.id;



    const date =
        order.createdAt
        ? order.createdAt
            .toDate()
            .toLocaleDateString("en-IN")
        : "N/A";



    document.querySelector(
        "#order-date"
    ).textContent =
        date;




    document.querySelector(
        "#customer-name"
    ).textContent =
        order.customer?.name || "";




    // ===============================
    // PRODUCTS
    // ===============================


    const products =
        await getProducts();



    const orderItemsContainer =
        document.querySelector(
            "#order-items"
        );



    orderItemsContainer.innerHTML = "";




    order.items.forEach(item => {



        const product =
            products.find(
                p =>
                p.id === item.id
            );



        if(!product) return;




        const itemTotal =
            product.price *
            item.quantity;



        orderItemsContainer.innerHTML += `


        <div class="order-item">


            <img
            src="${product.image}"
            alt="${product.name}"
            >



            <div>


                <h3>
                    ${product.name}
                </h3>



                <p>

                    Quantity:
                    ${item.quantity}

                </p>


            </div>



            <strong>

                ₹${itemTotal}

            </strong>



        </div>


        `;


    });





    // ===============================
    // TOTALS
    // ===============================


    const subtotal =
        order.subtotal || 0;


    const shipping =
        order.shipping || 0;


    const tax =
        order.tax || 0;


    const total =
        order.total || subtotal;




    document.querySelector(
        "#order-total"
    ).textContent =
        `₹${total}`;




    document.querySelector(
        "#order-subtotal"
    ).textContent =
        `₹${subtotal}`;




    document.querySelector(
        "#order-shipping"
    ).textContent =
        shipping === 0
        ? "FREE"
        : `₹${shipping}`;




    document.querySelector(
        "#order-tax"
    ).textContent =
        `₹${tax}`;


}