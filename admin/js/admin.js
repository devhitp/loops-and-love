// ==========================================
// ADMIN DASHBOARD AUTH CHECK
// ==========================================


import {

    renderStatistics,

    renderRecentOrders,

    renderRevenueChart,

    renderOrderStatusChart,

    renderTopProducts,
    renderTopCustomers,
    renderRecentActivity

} from "./dashboard.js";


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

    // Customers
    const customerSnapshot =
        await getDocs(
            collection(db, "customers")
        );

    const customers =
        customerSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

    const revenueFilter =
        document.querySelector("#revenue-filter");

    // Dashboard Statistics
    renderStatistics(
        products,
        orders,
        customers
    );


    // Recent Orders
    renderRecentOrders(orders);

    // Revenue Chart
    if (revenueFilter) {

        renderRevenueChart(
            orders,
            revenueFilter.value
        );

        revenueFilter.addEventListener(
            "change",
            () => {

                renderRevenueChart(
                    orders,
                    revenueFilter.value
                );

            }
        );

    }

    renderOrderStatusChart(orders);

    renderTopProducts(
        orders
    );
    renderTopCustomers(orders);
    renderRecentActivity(
        orders,
        customers
    );

}


loadDashboard();

// ==========================================
// DASHBOARD ANALYTICS
// ==========================================

function loadDashboardStats() {
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