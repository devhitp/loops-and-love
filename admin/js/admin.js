// ==========================================
// ADMIN DASHBOARD AUTH CHECK
// ==========================================





import {
    checkAuth
} from "../../firebase/auth.js";

import {
    logoutUser
} from "../../firebase/auth.js";
import { db } from "../../firebase/firebase-config.js";

import {
    collection,
    getDocs
} from "firebase/firestore";

import {
    getProducts
} from "../../firebase/firestore.js";

checkAuth((user) => {



    if (!user) {



        window.location.replace("admin-login.html");

    }

});




// ==========================================
// LOGOUT
// ==========================================




const logoutBtn =
    document.querySelector("#logout-btn");



if (logoutBtn) {


    logoutBtn.addEventListener(
        "click",
        async () => {

            try {

                await logoutUser();

                window.location.replace("admin-login.html");

            } catch (error) {

                console.error(error);

            }

        }
    );


}



// ==========================================
// DASHBOARD DATA (FIRESTORE)
// ==========================================

async function loadDashboard() {

    // Products
    const products = await getProducts();

    // Orders
    const orderSnapshot = await getDocs(
        collection(db, "orders")
    );

    const orders = orderSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    // Products
    const productCount =
        document.querySelector("#product-count");

    // Orders
    const orderCount =
        document.querySelector("#order-count");

    // Customers (unique phone numbers)
    const customerPhones =
        new Set(
            orders.map(order => order.customer.phone)
        );

    const customerCountElement =
        document.querySelector("#customer-count");

    // Revenue
    const revenue =
        orders.reduce(
            (sum, order) => sum + Number(order.total || 0),
            0
        );


    const revenueCount =
        document.querySelector("#revenue-count");

    if (productCount)
        productCount.textContent = products.length;


    if (orderCount)
        orderCount.textContent = orders.length;


    if (customerCountElement)
        customerCountElement.textContent = customerCount;


    if (revenueCount)
        revenueCount.textContent = `₹${revenue}`;

    // Recent Orders
    const recentOrders =
        document.querySelector("#recent-orders");


    if (recentOrders) {

        recentOrders.innerHTML = "";

    }

    if (orders.length === 0) {

        recentOrders.innerHTML =
            `<p class="empty-orders">No orders yet</p>`;

        return;

    }

    if (recentOrders) {
        orders
            .sort((a, b) => {

                if (!a.createdAt || !b.createdAt)
                    return 0;

                return (
                    b.createdAt.seconds -
                    a.createdAt.seconds
                );

            })
            .slice(0, 5)
            .forEach(order => {

                recentOrders.innerHTML += `
                <div class="recent-order">

                    <span>${order.id}</span>

                    <span>${order.customer.name}</span>

                    <span>₹${order.total}</span>

                    <span class="status ${order.status.toLowerCase()}">
                        ${order.status}
                    </span>

                </div>
            `;

            });
    }

}

loadDashboard();

// ==========================================
// DASHBOARD ANALYTICS
// ==========================================

function loadDashboardStats() {

    const products =
        JSON.parse(localStorage.getItem("products")) || [];

    const orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    const customers =
        JSON.parse(localStorage.getItem("customers")) || [];

    const revenue =
        orders.reduce(
            (total, order) => total + order.total,
            0
        );

    document.querySelector("#product-count").textContent =
        products.length;

    document.querySelector("#order-count").textContent =
        orders.length;

    document.querySelector("#customer-count").textContent =
        customers.length;

    document.querySelector("#revenue-count").textContent =
        `₹${revenue}`;

}

// loadDashboardStats();