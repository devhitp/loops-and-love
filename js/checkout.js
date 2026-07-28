// ===========================================
// GET CART
// ===========================================
import { getProducts } from "../firebase/firestore.js";
import {
    addDoc,
    collection,
    serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase/firebase-config.js";
console.log("FIREBASE DB:", db);

const cart = JSON.parse(localStorage.getItem("cart")) || [];
console.log("CHECKOUT CART:", cart);
const storeSettings =
    JSON.parse(
        localStorage.getItem("settings")
    ) || {};
const checkoutItems = document.querySelector("#checkout-items");
const customerName = document.querySelector("#customer-name");
const customerPhone = document.querySelector("#customer-phone");
const customerAddress = document.querySelector("#customer-address");
const customerCity = document.querySelector("#customer-city");
const customerPincode = document.querySelector("#customer-pincode");
const subtotalElement = document.querySelector("#checkout-subtotal");
const totalElement = document.querySelector("#checkout-total");
let subtotal = 0;

let shipping = 0;

let tax = 0;

let total = 0;

let products = [];

async function loadCheckout() {

    products = await getProducts();

    renderCheckout();

}

function renderCheckout() {
    cart.forEach(item => {
        const product =
            products.find(
                p => p.id === item.id
            );
        if (!product) return;
        subtotal += product.price * item.quantity;
        checkoutItems.innerHTML += `
        <div class="checkout-product">
            <span>
                ${product.name}

x${item.quantity}

</span>



<span>

₹${product.price * item.quantity}

</span>


</div>


`;


    });
    updateCheckoutTotals();
}

function updateCheckoutTotals() {


    shipping = 0;

    tax = 0;


    if (
        subtotal <
        (storeSettings.freeShippingLimit || 999)
    ) {

        shipping =
            storeSettings.shippingCharge || 0;

    }


    tax =
        Math.round(
            subtotal *
            ((storeSettings.taxRate || 0) / 100)
        );


    const total =
        subtotal +
        shipping +
        tax;



    document.querySelector("#checkout-subtotal")
        .textContent =
        `₹${subtotal}`;


    document.querySelector("#checkout-shipping")
        .textContent =
        `₹${shipping}`;


    document.querySelector("#checkout-tax")
        .textContent =
        `₹${tax}`;


    document.querySelector("#checkout-total")
        .textContent =
        `₹${total}`;

}

loadCheckout();




const placeOrderButton =
    document.querySelector(".place-order-btn");

const checkoutForm =
    document.querySelector("#checkout-form");

const form =
    document.querySelector("#checkout-form");

const nameInput =
    document.querySelector("#customer-name");

const phoneInput =
    document.querySelector("#customer-phone");

const addressInput =
    document.querySelector("#customer-address");

const cityInput =
    document.querySelector("#customer-city");

const pincodeInput =
    document.querySelector("#customer-pincode");

function showError(input, message) {

    const group =
        input.parentElement;

    group.classList.remove("success");

    group.classList.add("error");

    group.querySelector(".error-message").textContent =
        message;

}

function showSuccess(input) {

    const group =
        input.parentElement;

    group.classList.remove("error");

    group.classList.add("success");

    group.querySelector(".error-message").textContent =
        "";

}

function validateForm() {

    let valid = true;

    if (!/^[A-Za-z ]+$/.test(nameInput.value.trim())) {

        showError(nameInput, "Enter a valid name.");

        valid = false;

    } else {

        showSuccess(nameInput);

    }

    if (!/^[6-9]\d{9}$/.test(phoneInput.value.trim())) {

        showError(phoneInput, "Enter a valid 10-digit phone number.");

        valid = false;

    } else {

        showSuccess(phoneInput);

    }

    if (addressInput.value.trim().length < 10) {

        showError(addressInput, "Address should be at least 10 characters.");

        valid = false;

    } else {

        showSuccess(addressInput);

    }

    if (!/^[A-Za-z ]+$/.test(cityInput.value.trim())) {

        showError(cityInput, "Enter a valid city.");

        valid = false;

    } else {

        showSuccess(cityInput);

    }

    if (!/^\d{6}$/.test(pincodeInput.value.trim())) {

        showError(pincodeInput, "Enter a valid 6-digit pincode.");

        valid = false;

    } else {

        showSuccess(pincodeInput);

    }

    return valid;

}


function validateField(input) {

    switch (input.id) {

        case "customer-name":

            if (!/^[A-Za-z ]+$/.test(input.value.trim())) {

                showError(
                    input,
                    "Enter a valid name."
                );

            } else {

                showSuccess(input);

            }

            break;

        case "customer-phone":

            if (!/^[6-9]\d{9}$/.test(input.value.trim())) {

                showError(
                    input,
                    "Enter a valid 10-digit phone number."
                );

            } else {

                showSuccess(input);

            }

            break;

        case "customer-address":

            if (input.value.trim().length < 10) {

                showError(
                    input,
                    "Address should be at least 10 characters."
                );

            } else {

                showSuccess(input);

            }

            break;

        case "customer-city":

            if (!/^[A-Za-z ]+$/.test(input.value.trim())) {

                showError(
                    input,
                    "Enter a valid city."
                );

            } else {

                showSuccess(input);

            }

            break;

        case "customer-pincode":

            if (!/^\d{6}$/.test(input.value.trim())) {

                showError(
                    input,
                    "Enter a valid 6-digit pincode."
                );

            } else {

                showSuccess(input);

            }

            break;

    }

}
[
    nameInput,
    phoneInput,
    addressInput,
    cityInput,
    pincodeInput
].forEach(input => {

    input.addEventListener("input", () => {

        validateField(input);

    });

});

phoneInput.addEventListener("input", () => {

    phoneInput.value =
        phoneInput.value.replace(/\D/g, "");

});

pincodeInput.addEventListener("input", () => {

    pincodeInput.value =
        pincodeInput.value.replace(/\D/g, "");

});
function saveCustomerDetails() {

    const customerDetails = {

        name: customerName.value.trim(),

        phone: customerPhone.value.trim(),

        address: customerAddress.value.trim(),

        city: customerCity.value.trim(),

        pincode: customerPincode.value.trim()

    };


    localStorage.setItem(

        "customerDetails",

        JSON.stringify(customerDetails)

    );

}
function loadCustomerDetails() {

    const savedDetails =
        JSON.parse(
            localStorage.getItem("customerDetails")
        );


    if (!savedDetails) return;


    customerName.value =
        savedDetails.name || "";


    customerPhone.value =
        savedDetails.phone || "";


    customerAddress.value =
        savedDetails.address || "";


    customerCity.value =
        savedDetails.city || "";


    customerPincode.value =
        savedDetails.pincode || "";

}


placeOrderButton.addEventListener("click", function (e) {

    e.preventDefault();


    if (!validateForm()) {

        showToast(
            "Invalid Details",
            "Please correct the highlighted fields.",
            "error"
        );

        return;

    }


    // Loading state

    placeOrderButton.disabled = true;

    placeOrderButton.innerHTML = `

        <i class="fa-solid fa-spinner fa-spin"></i>

        Processing Order...

    `;


    saveCustomerDetails();


    setTimeout(async () => {


        const orderId =
            "LL" + Date.now();



        const customerDetails =
            JSON.parse(
                localStorage.getItem("customerDetails")
            );



        const orderRef = await addDoc(
            collection(db, "orders"),
            {

                items: cart,

                subtotal,

                shipping,

                tax,

                total,

                customer: customerDetails,

                status: "Pending",

                createdAt: serverTimestamp()

            }
        );
        console.log(
            "ORDER CREATED SUCCESSFULLY:",
            orderRef.id
        );



        localStorage.setItem(
            "latestOrderId",
            orderRef.id
        );
        // SAVE ORDER HISTORY FOR ADMIN


        let orders =
            JSON.parse(
                localStorage.getItem("orders")
            ) || [];


        orders.push({

            id: orderRef.id,

            items: cart,

            subtotal,

            shipping,

            tax,

            total,

            customer: customerDetails,

            status: "Pending"

        });


        localStorage.setItem(
            "orders",
            JSON.stringify(orders)
        );

        // ==========================================
        // SAVE CUSTOMER DATA
        // ==========================================


        let customers =
            JSON.parse(
                localStorage.getItem("customers")
            ) || [];



        const existingCustomer =
            customers.find(
                customer =>
                    customer.phone === customerDetails.phone
            );





        if (existingCustomer) {


            existingCustomer.orders += 1;


            existingCustomer.spent += subtotal;



        }
        else {


            customers.push({

                name:
                    customerDetails.name,


                phone:
                    customerDetails.phone,


                address:
                    customerDetails.address,


                city:
                    customerDetails.city,


                pincode:
                    customerDetails.pincode,


                orders: 1,


                spent: subtotal


            });


        }




        localStorage.setItem(

            "customers",

            JSON.stringify(customers)

        );



        localStorage.setItem(
            "orderId",
            orderRef.id
        );



        localStorage.removeItem("cart");

        localStorage.setItem(
            "latestOrderId",
            orderRef.id
        );

        window.location.href =
            "order-success.html";


    }, 1500);


});
loadCustomerDetails();