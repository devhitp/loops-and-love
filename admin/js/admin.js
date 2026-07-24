// ==========================================
// ADMIN DASHBOARD AUTH CHECK
// ==========================================

const isAdminLoggedIn =
localStorage.getItem("adminLoggedIn");



if(isAdminLoggedIn !== "true"){

    window.location.href =
    "admin-login.html";

}




// ==========================================
// LOGOUT
// ==========================================


const logoutBtn =
document.querySelector("#logout-btn");



if(logoutBtn){


logoutBtn.addEventListener(
"click",
()=>{


    localStorage.removeItem(
        "adminLoggedIn"
    );


    window.location.href =
    "admin-login.html";


});


}
// ==========================================
// DASHBOARD DATA
// ==========================================


const products =
JSON.parse(
    localStorage.getItem("products")
) || [];



const orders =
JSON.parse(
    localStorage.getItem("orders")
) || [];



const customers =
JSON.parse(
    localStorage.getItem("customers")
) || [];




// PRODUCTS

const productCount =
document.querySelector(
".stat-card:nth-child(1) strong"
);


if(productCount){

    productCount.textContent =
    products.length;

}



// ORDERS

const orderCount =
document.querySelector(
".stat-card:nth-child(2) strong"
);


if(orderCount){

    orderCount.textContent =
    orders.length;

}



// CUSTOMERS

const customerCount =
document.querySelector(
".stat-card:nth-child(3) strong"
);


if(customerCount){

    customerCount.textContent =
    customers.length;

}



// REVENUE

let revenue = 0;


orders.forEach(order=>{

    revenue += Number(order.total);

});



const revenueElement =
document.querySelector(
".stat-card:nth-child(4) strong"
);



if(revenueElement){

    revenueElement.textContent =
    "₹" + revenue;

}
// ==========================================
// RECENT ORDERS
// ==========================================


const recentOrders =
document.querySelector("#recent-orders");



if(recentOrders){


    const latestOrders =
    orders.slice(-5).reverse();



    if(latestOrders.length === 0){

        recentOrders.innerHTML =
        `
        <p class="empty-orders">
        No orders yet
        </p>
        `;

    }
    else{


        latestOrders.forEach(order=>{


            recentOrders.innerHTML += `

            <div class="recent-order">


                <span>
                ${order.id}
                </span>


                <span>
                ${order.customer.name}
                </span>


                <span>
                ₹${order.total}
                </span>


                <span class="status ${order.status.toLowerCase()}">
                ${order.status}
                </span>


            </div>


            `;


        });


    }


}