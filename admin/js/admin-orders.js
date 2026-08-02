// ==========================================
// DISPLAY ORDERS
// ==========================================

import { db } from "../../firebase/firebase-config.js";


import {
    collection,
    getDocs,
    doc,
    updateDoc
} from "firebase/firestore";

const ordersTable =
    document.querySelector(".orders-table");
    const mobileOrders =
    document.querySelector("#recent-orders-mobile");
const orderModal =
    document.querySelector("#order-modal");

const closeOrderModal =
    document.querySelector("#close-order-modal");

const orderDetails =
    document.querySelector("#order-details");
let orders = [];



async function loadOrders() {

    const snapshot = await getDocs(
        collection(db, "orders")
    );

    orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    console.log("Orders from Firestore:", orders);

    renderOrders();

}

function renderOrders() {

    const emptyMessage =
        document.querySelector(".empty-orders");

    document
        .querySelectorAll(".order-row")
        .forEach(row => row.remove());

    mobileOrders.innerHTML = "";

    if (orders.length === 0) {

        emptyMessage.style.display = "block";
        return;

    }

    emptyMessage.style.display = "none";

    orders.forEach(order => {

        const row =
            document.createElement("div");

        row.className = "order-row";

        row.innerHTML = `
            <span>${order.id}</span>

            <span>${order.customer.name}</span>

            <span>₹${order.total}</span>

            <span>
                <span class="status ${order.status.toLowerCase()}">
                    ${order.status}
                </span>
            </span>

            <span>
                <button
                    class="view-order-btn"
                    data-id="${order.id}">
                    View
                </button>
            </span>
        `;

        ordersTable.appendChild(row);

        const card = document.createElement("div");

card.className = "mobile-order-card";

card.innerHTML = `
    <h3>${order.id}</h3>

    <div class="mobile-order-info">
        <span class="label">Customer</span>
        <strong>${order.customer.name}</strong>
    </div>

    <div class="mobile-order-info">
        <span class="label">Amount</span>
        <strong>₹${order.total}</strong>
    </div>

    <div class="mobile-order-info">
        <span class="label">Status</span>

        <span class="status ${order.status.toLowerCase()}">
            ${order.status}
        </span>
    </div>

    <button
        class="view-order-btn"
        data-id="${order.id}">
        View Order
    </button>
`;

mobileOrders.appendChild(card);

    });

}

// ==========================================
// VIEW ORDER
// ==========================================

document.addEventListener(
    "click",
    function (e) {

        const button =
            e.target.closest(".view-order-btn");

        if (!button) return;

        const orderId =
            button.dataset.id;

        const order =
            orders.find(
                o => o.id === orderId
            );

        if (!order) return;

        showOrderDetails(order);

        orderModal.classList.add("active");

    }
);

function showOrderDetails(order) {

    let itemsHTML = "";

    order.items.forEach(item => {

        itemsHTML += `

        <div class="order-item">

            <span>

                ${item.name}
                × ${item.quantity}

            </span>

            <span>

                ₹${item.price * item.quantity}

            </span>

        </div>

        `;

    });

    orderDetails.innerHTML = `

        <div class="order-section">

            <h3>Order Information</h3>

            <p><strong>Order ID:</strong> ${order.id}</p>

            <p>

    <strong>Status:</strong>

    <select
        id="order-status"
        data-id="${order.id}">

        <option
            value="Pending"
            ${order.status === "Pending" ? "selected" : ""}>

            Pending

        </option>

        <option
            value="Processing"
            ${order.status === "Processing" ? "selected" : ""}>

            Processing

        </option>

        <option
            value="Shipped"
            ${order.status === "Shipped" ? "selected" : ""}>

            Shipped

        </option>

        <option
            value="Delivered"
            ${order.status === "Delivered" ? "selected" : ""}>

            Delivered

        </option>

        <option
            value="Cancelled"
            ${order.status === "Cancelled" ? "selected" : ""}>

            Cancelled

        </option>

    </select>

</p>

            <p><strong>Date:</strong>
${order.createdAt
            ? order.createdAt.toDate().toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short"
            })
            : "Just now"
        }
</p>

        </div>

        <div class="order-section">

    <h3>Customer Information</h3>

    <p><strong>Name:</strong> ${order.customer.name}</p>

    <p><strong>Phone:</strong> ${order.customer.phone}</p>

    <p><strong>Address:</strong> ${order.customer.address}</p>

    <p><strong>City:</strong> ${order.customer.city}</p>

    <p><strong>Pincode:</strong> ${order.customer.pincode}</p>

</div>

        <div class="order-section">

            <h3>Items</h3>

            ${itemsHTML}
        </div>

        <div class="order-total">

            Total: ₹${order.total}

        </div>

    `;

}


closeOrderModal.addEventListener(
    "click",
    () => {

        orderModal.classList.remove("active");

    }
);

orderModal.addEventListener(
    "click",
    (e) => {

        if (e.target === orderModal) {

            orderModal.classList.remove("active");

        }

    }
);

// ==========================================
// UPDATE ORDER STATUS
// ==========================================

document.addEventListener(
    "change",
    async function (e) {

        if (e.target.id !== "order-status") return;

        const orderId =
            e.target.dataset.id;

        const newStatus =
            e.target.value;

        const order =
            orders.find(
                o => o.id === orderId
            );

        if (!order) return;

        order.status = newStatus;

        await updateDoc(
            doc(db, "orders", orderId),
            {
                status: newStatus
            }
        );

        renderOrders();

        showToast("Order status updated!");

    }
);


loadOrders();