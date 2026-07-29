// ==========================================
// DISPLAY CUSTOMERS
// ==========================================
import { db } from "../../firebase/firebase-config.js";

import {
    collection,
    getDocs
} from "firebase/firestore";

const customersTable =
    document.querySelector(".customers-table");
const customerModal =
    document.querySelector("#customer-modal");

const customerDetails =
    document.querySelector("#customer-details");

const closeCustomerModal =
    document.querySelector("#close-customer-modal");

let customers = [];
let orders = [];

async function loadCustomers() {


    const customerSnapshot =
        await getDocs(
            collection(db, "customers")
        );


    customers =
        customerSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));


    const orderSnapshot =
        await getDocs(
            collection(db, "orders")
        );


    orders =
        orderSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));


    renderCustomers();

}


function renderCustomers() {


    const emptyMessage =
        document.querySelector(".empty-customers");



    document
        .querySelectorAll(".customer-row")
        .forEach(row => row.remove());



    if (customers.length === 0) {

        emptyMessage.style.display = "block";
        return;

    }


    emptyMessage.style.display = "none";



    customers.forEach(customer => {


        const row =
            document.createElement("div");


        row.className = "customer-row";



        let customerType = "New";
        let customerClass = "new";



        if (customer.spent >= 2000) {

            customerType = "VIP";
            customerClass = "vip";

        }

        else if (customer.spent >= 500) {

            customerType = "Regular";
            customerClass = "regular";

        }



        row.innerHTML = `

        <span>${customer.name}</span>

        <span>${customer.phone}</span>

        <span>${customer.orders}</span>

        <span>₹${customer.spent}</span>

        <span>
            <span class="customer-type ${customerClass}">
                ${customerType}
            </span>
        </span>

        <span>
            <button 
            class="view-customer-btn"
            data-phone="${customer.phone}">
            View
            </button>
        </span>

        `;


        customersTable.appendChild(row);


    });


}
// ==========================================
// VIEW CUSTOMER
// ==========================================

document.addEventListener(
    "click",
    function (e) {

        const button =
            e.target.closest(".view-customer-btn");

        if (!button) return;

        const phone =
            button.dataset.phone;

        const customer =
            customers.find(
                c => c.phone === phone
            );

        if (!customer) return;

        const customerOrders =
            orders.filter(
                order =>
                    order.customer.phone === phone
            );

        let historyHTML = "";

        customerOrders.forEach(order => {

            historyHTML += `

            <div class="order-item">

                <span>${order.id}</span>

                <span>₹${order.total}</span>

                <span>${order.status}</span>

            </div>

            `;

        });

        customerDetails.innerHTML = `

            <div class="order-section">

                <h3>Customer Information</h3>

                <p><strong>Name:</strong> ${customer.name}</p>

                <p><strong>Phone:</strong> ${customer.phone}</p>

                <p><strong>Address:</strong> ${customer.address}</p>

                <p><strong>City:</strong> ${customer.city}</p>

                <p><strong>Pincode:</strong> ${customer.pincode}</p>

                <p><strong>Total Orders:</strong> ${customer.orders}</p>

                <p><strong>Total Spent:</strong> ₹${customer.spent}</p>

            </div>

            <div class="order-section">

                <h3>Order History</h3>

                ${historyHTML || "<p>No orders found.</p>"}

            </div>

        `;

        customerModal.classList.add("active");

    }
);
closeCustomerModal.addEventListener(
    "click",
    () => {

        customerModal.classList.remove("active");

    }
);

customerModal.addEventListener(
    "click",
    function (e) {

        if (e.target === customerModal) {

            customerModal.classList.remove("active");

        }

    }
);



loadCustomers();