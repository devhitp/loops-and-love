export function renderRevenueChart(
    orders,
    filter = "7days"
) {

    const canvas =
        document.querySelector("#revenue-chart");

    if (!canvas)
        return;

    const filteredOrders =
        filterOrders(
            orders,
            filter
        );

    if (window.revenueChart) {
        window.revenueChart.destroy();
    }

    const {

        labels,
        revenueData

    } = getRevenueData(
        filteredOrders,
        filter
    );

    window.revenueChart = new Chart(canvas, {

        type: "line",

        data: {
            labels,
            datasets: [{
                label: "Revenue",
                data: revenueData,
                tension: 0.35,
                fill: true,
                borderWidth: 3
            }]
        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: false

                }

            },

            scales: {

                y: {

                    beginAtZero: true

                }

            }

        }

    });

}

export function renderOrderStatusChart(orders) {

    const canvas =
        document.querySelector("#order-status-chart");

    if (!canvas)
        return;

    if (window.orderStatusChart) {
        window.orderStatusChart.destroy();
    }

    const statusCount = {

        Pending: 0,
        Confirmed: 0,
        Shipped: 0,
        Delivered: 0,
        Cancelled: 0

    };

    orders.forEach(order => {

        if (statusCount.hasOwnProperty(order.status)) {

            statusCount[order.status]++;

        }

    });

    const pendingElement =
        document.querySelector("#pending-count");

    const confirmedElement =
        document.querySelector("#confirmed-count");

    const shippedElement =
        document.querySelector("#shipped-count");

    const deliveredElement =
        document.querySelector("#delivered-count");

    const cancelledElement =
        document.querySelector("#cancelled-count");


    if (pendingElement)
        pendingElement.textContent =
            statusCount.Pending;

    if (confirmedElement)
        confirmedElement.textContent =
            statusCount.Confirmed;

    if (shippedElement)
        shippedElement.textContent =
            statusCount.Shipped;

    if (deliveredElement)
        deliveredElement.textContent =
            statusCount.Delivered;

    if (cancelledElement)
        cancelledElement.textContent =
            statusCount.Cancelled;



    window.orderStatusChart = new Chart(canvas, {

        type: "doughnut",

        data: {

            labels: Object.keys(statusCount),

            datasets: [{

                data: Object.values(statusCount),

                borderWidth: 2

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    position: "bottom"
                }

            }

        }

    });

}

export function renderStatistics(
    products,
    orders,
    customers
) {

    // Products
    const productCount =
        document.querySelector("#product-count");

    // Orders
    const orderCount =
        document.querySelector("#order-count");

    // Customers
    const customerCount =
        document.querySelector("#customer-count");

    // Revenue
    const revenueCount =
        document.querySelector("#revenue-count");

    // Today's Orders
    const todayOrdersElement =
        document.querySelector("#today-orders");

    // Pending Orders
    const pendingOrdersElement =
        document.querySelector("#pending-orders");

    // Average Order
    const averageOrderElement =
        document.querySelector("#average-order");

    // Monthly Revenue
    const monthlyRevenueElement =
        document.querySelector("#monthly-revenue");

    // New Customers
    const newCustomersElement =
        document.querySelector("#new-customers");



    const revenue =
        orders.reduce(
            (sum, order) =>
                sum + Number(order.total || 0),
            0
        );



    const today =
        new Date();

    const todayOrders =
        orders.filter(order => {

            if (!order.createdAt)
                return false;

            const date =
                order.createdAt.toDate();

            return (

                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()

            );

        });



    const pendingOrders =
        orders.filter(
            order =>
                order.status === "Pending"
        );



    const averageOrder =
        orders.length
            ? Math.round(revenue / orders.length)
            : 0;



    const monthlyRevenue =
        orders.reduce((sum, order) => {

            if (!order.createdAt)
                return sum;

            const date =
                order.createdAt.toDate();

            const currentMonth =

                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();

            return currentMonth
                ? sum + Number(order.total || 0)
                : sum;

        }, 0);



    const newCustomers =
        customers.filter(customer => {

            if (!customer.createdAt)
                return false;

            const date =
                customer.createdAt.toDate();

            return (

                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()

            );

        }).length;



    if (productCount)
        productCount.textContent =
            products.length;

    if (orderCount)
        orderCount.textContent =
            orders.length;

    if (customerCount)
        customerCount.textContent =
            customers.length;

    if (revenueCount)
        revenueCount.textContent =
            `₹${revenue}`;

    if (todayOrdersElement)
        todayOrdersElement.textContent =
            todayOrders.length;

    if (pendingOrdersElement)
        pendingOrdersElement.textContent =
            pendingOrders.length;

    if (averageOrderElement)
        averageOrderElement.textContent =
            `₹${averageOrder}`;

    if (monthlyRevenueElement)
        monthlyRevenueElement.textContent =
            `₹${monthlyRevenue}`;

    if (newCustomersElement)
        newCustomersElement.textContent =
            newCustomers;

}

export function renderRecentOrders(orders) {

    const recentOrders =
        document.querySelector("#recent-orders");

    if (!recentOrders)
        return;

    recentOrders.innerHTML = "";

    if (orders.length === 0) {

        recentOrders.innerHTML =
            `<p class="empty-orders">No orders yet</p>`;

        return;

    }
    const latestOrders = [...orders]

        .sort((a, b) => {

            if (!a.createdAt || !b.createdAt)
                return 0;

            return b.createdAt.seconds -
                a.createdAt.seconds;

        })

        .slice(0, 5);

    latestOrders.forEach(order => {

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

    const mobileContainer =
        document.querySelector("#recent-orders-mobile");

    if (mobileContainer) {

        mobileContainer.innerHTML = "";

        latestOrders.forEach(order => {

            mobileContainer.innerHTML += `

<div class="mobile-order-card">

    <h3>
        Order #${order.id.slice(0, 8)}...
    </h3>

    <div class="mobile-order-info">

        <span class="label">
            👤 Customer
        </span>

        <strong>
            ${order.customer.name}
        </strong>

    </div>

    <div class="mobile-order-info">

        <span class="label">
            💰 Amount
        </span>

        <strong>
            ₹${order.total}
        </strong>

    </div>

    <div class="mobile-order-info">

        <span class="label">
            📦 Status
        </span>

        <span class="status ${order.status.toLowerCase()}">

            ${order.status}

        </span>

    </div>

</div>

`;

        });

    }

}

export function renderTopProducts(orders) {

    const container =
        document.querySelector("#top-products");

    if (!container)
        return;

    container.innerHTML = "";

    const products = {};

    orders.forEach(order => {

        if (!order.items)
            return;

        order.items.forEach(item => {

            if (!products[item.id]) {

                products[item.id] = {

                    id: item.id,

                    name: item.name,

                    image: item.image,

                    sold: 0,

                    revenue: 0

                };

            }

            products[item.id].sold +=
                Number(item.quantity);

            products[item.id].revenue +=
                Number(item.price) *
                Number(item.quantity);

        });

    });

    const topProducts =
        Object.values(products)

            .sort(
                (a, b) =>
                    b.sold - a.sold
            )

            .slice(0, 5);

    if (topProducts.length === 0) {

        container.innerHTML =
            "<p>No sales yet.</p>";

        return;

    }

    topProducts.forEach((product, index) => {

        const medals = [
            "🥇",
            "🥈",
            "🥉",
            "4️⃣",
            "5️⃣"
        ];

        container.innerHTML += `

        <div class="top-product">

            <img
                src="${product.image}"
                alt="${product.name}"
                class="top-product-image"
            >

            <div class="top-product-info">

                <div class="product-header">

    <span class="product-rank">

        ${medals[index]} Best Seller

    </span>

    <h3>

        ${product.name}

    </h3>

</div>

                <p>
                    <strong>${product.sold}</strong> Sold
                </p>

                <p class="product-revenue">

    ₹${product.revenue}
    

</p>

                <div class="progress-bar">

                    <div
                        class="progress-fill"
                        style="width:0%"
                        data-sold="${product.sold}"
                    ></div>

                </div>

            </div>

        </div>

    `;

    });
    const highestSold = topProducts[0].sold;

    document
        .querySelectorAll(".progress-fill")
        .forEach(bar => {

            const sold =
                Number(bar.dataset.sold);

            const width =
                (sold / highestSold) * 100;

            setTimeout(() => {

                bar.style.width =
                    width + "%";

            }, 100);

        });

}

export function renderTopCustomers(orders) {

    const container =
        document.querySelector("#top-customers");

    if (!container)
        return;


    container.innerHTML = "";

    const customerMap = {};

    orders.forEach(order => {

        const phone = order.customer.phone;

        if (!customerMap[phone]) {

            customerMap[phone] = {

                name: order.customer.name,

                phone: phone,

                orders: 0,

                spent: 0

            };

        }
        customerMap[phone].orders++;

        customerMap[phone].spent += Number(order.total || 0);

    });
    const topCustomers = Object.values(customerMap)

        .sort((a, b) => b.spent - a.spent)

        .slice(0, 5);

    if (topCustomers.length === 0) {

        container.innerHTML = "<p>No customers yet.</p>";

        return;

    }
    const medals = [
        "🥇",
        "🥈",
        "🥉",
        "4️⃣",
        "5️⃣"
    ];

    topCustomers.forEach((customer, index) => {

        container.innerHTML += `

    <div class="top-customer">

        <div class="top-customer-info">

            <div class="customer-header">

                <span class="customer-rank">

                    ${medals[index]} Top Customer

                </span>

                <h3>

                    ${customer.name}

                </h3>

            </div>

            <p>

                📞 ${customer.phone}

            </p>

            <p>

                <strong>${customer.orders}</strong> Orders

            </p>

            <p class="customer-spent">

                ₹${customer.spent}

            </p>

            <div class="progress-bar">

                <div
                    class="progress-fill"
                    style="width:0%"
                    data-spent="${customer.spent}"
                ></div>

            </div>

        </div>

    </div>

    `;

    });
    const highestSpent = topCustomers[0].spent;

    document
        .querySelectorAll(".top-customer .progress-fill")
        .forEach(bar => {

            const spent =
                Number(bar.dataset.spent);

            const width =
                (spent / highestSpent) * 100;

            setTimeout(() => {

                bar.style.width =
                    width + "%";

            }, 100);

        });
}

export function renderRecentActivity(
    orders,
    customers
) {

    const container =
        document.querySelector("#recent-activity");

    if (!container)
        return;

    container.innerHTML = "";

    const activities = [];

    orders.forEach(order => {

        activities.push({

            type: "order",

            title: `Order ${order.status}`,

            subtitle: order.customer.name,

            time: order.createdAt,

            icon: getOrderIcon(order.status),

            orderId: order.id

        });

    });
    customers.forEach(customer => {

        activities.push({

            type: "customer",

            title: "New Customer",

            subtitle: customer.name,

            time: customer.createdAt,

            icon: "👤"

        });

    });
    activities.sort((a, b) => {

        if (!a.time || !b.time)
            return 0;

        return b.time.seconds - a.time.seconds;

    });
    const latestActivities =
        activities.slice(0, 8);

    if (latestActivities.length === 0) {

        container.innerHTML =
            "<p>No recent activity.</p>";

        return;

    }

    latestActivities.forEach(activity => {

        container.innerHTML += `

    <div class="activity-item">

        <div class="activity-icon">

            ${activity.icon}

        </div>

        <div class="activity-content">

            <h3>

                ${activity.title}

            </h3>

            <p>

                ${activity.subtitle}

            </p>

            <small>

                ${formatActivityTime(activity.time)}

            </small>

        </div>

    </div>

    `;

    });


    console.log(latestActivities);
}

function getOrderIcon(status) {

    switch (status) {

        case "Pending":
            return "🟡";

        case "Confirmed":
            return "🔵";

        case "Shipped":
            return "🟣";

        case "Delivered":
            return "🟢";

        case "Cancelled":
            return "🔴";

        default:
            return "⚪";

    }

}
function formatActivityTime(timestamp) {

    if (!timestamp)
        return "";

    return timestamp
        .toDate()
        .toLocaleString("en-IN", {

            dateStyle: "medium",

            timeStyle: "short"

        });

}
function filterOrders(
    orders,
    filter
) {

    const now = new Date();

    return orders.filter(order => {

        if (!order.createdAt)
            return false;

        const orderDate =
            order.createdAt.toDate();

        switch (filter) {

            case "today":

                return (

                    orderDate.getDate() === now.getDate() &&
                    orderDate.getMonth() === now.getMonth() &&
                    orderDate.getFullYear() === now.getFullYear()

                );

            case "7days":

                return orderDate >= new Date(

                    now.getTime() -
                    (7 * 24 * 60 * 60 * 1000)

                );

            case "30days":

                return orderDate >= new Date(

                    now.getTime() -
                    (30 * 24 * 60 * 60 * 1000)

                );

            case "12months":

                return orderDate >= new Date(

                    now.getFullYear() - 1,
                    now.getMonth(),
                    now.getDate()

                );

            case "all":

            default:

                return true;

        }

    });

}
function get7DaysRevenue(orders){

    const labels = [];
    const revenueData = [];

    for(let i = 6; i >= 0; i--){

        const date = new Date();

        date.setDate(date.getDate() - i);

        labels.push(

            date.toLocaleDateString("en-IN",{
                weekday:"short"
            })

        );

        let dailyRevenue = 0;

        orders.forEach(order=>{

            if(!order.createdAt)
                return;

            const orderDate =
                order.createdAt.toDate();

            const isSameDay =

                orderDate.getDate() === date.getDate() &&
                orderDate.getMonth() === date.getMonth() &&
                orderDate.getFullYear() === date.getFullYear();

            if(isSameDay){

                dailyRevenue += Number(order.total || 0);

            }

        });

        revenueData.push(dailyRevenue);

    }

    return{

        labels,
        revenueData

    };

}
function getRevenueData(
    orders,
    filter
){

    switch(filter){

        case "today":

            return getTodayRevenue(orders);

        case "7days":

            return get7DaysRevenue(orders);

        case "30days":

            return get30DaysRevenue(orders);

        case "12months":

            return get12MonthsRevenue(orders);

        case "all":

        default:

            return getAllTimeRevenue(orders);

    }

}
function getTodayRevenue(orders){

    const labels = [];
    const revenueData = [];

    const now = new Date();

    for(let i = 11; i >= 0; i--){

        const hour = new Date(now);

        hour.setHours(now.getHours() - i, 0, 0, 0);

        labels.push(

            hour.toLocaleTimeString("en-IN",{

                hour: "numeric",
                hour12: true

            })

        );

        let hourlyRevenue = 0;

        orders.forEach(order=>{

            if(!order.createdAt)
                return;

            const orderDate =
                order.createdAt.toDate();

            const isSameHour =

                orderDate.getDate() === hour.getDate() &&
                orderDate.getMonth() === hour.getMonth() &&
                orderDate.getFullYear() === hour.getFullYear() &&
                orderDate.getHours() === hour.getHours();

            if(isSameHour){

                hourlyRevenue +=
                    Number(order.total || 0);

            }

        });

        revenueData.push(hourlyRevenue);

    }

    return{

        labels,
        revenueData

    };

}

function get30DaysRevenue(orders){

    const labels = [];
    const revenueData = [];

    for(let i = 29; i >= 0; i--){

        const date = new Date();

        date.setDate(date.getDate() - i);

        labels.push(

            date.toLocaleDateString("en-IN",{

                day:"numeric",
                month:"short"

            })

        );

        let dailyRevenue = 0;

        orders.forEach(order=>{

            if(!order.createdAt)
                return;

            const orderDate =
                order.createdAt.toDate();

            const isSameDay =

                orderDate.getDate() === date.getDate() &&
                orderDate.getMonth() === date.getMonth() &&
                orderDate.getFullYear() === date.getFullYear();

            if(isSameDay){

                dailyRevenue +=
                    Number(order.total || 0);

            }

        });

        revenueData.push(dailyRevenue);

    }

    return{

        labels,
        revenueData

    };

}

function get12MonthsRevenue(orders){

    const labels = [];
    const revenueData = [];

    const now = new Date();

    for(let i = 11; i >= 0; i--){

        const date = new Date(
            now.getFullYear(),
            now.getMonth() - i,
            1
        );

        labels.push(

            date.toLocaleDateString("en-IN",{

                month:"short"

            })

        );

        let monthlyRevenue = 0;

        orders.forEach(order=>{

            if(!order.createdAt)
                return;

            const orderDate =
                order.createdAt.toDate();

            const isSameMonth =

                orderDate.getMonth() === date.getMonth() &&
                orderDate.getFullYear() === date.getFullYear();

            if(isSameMonth){

                monthlyRevenue +=
                    Number(order.total || 0);

            }

        });

        revenueData.push(monthlyRevenue);

    }

    return{

        labels,
        revenueData

    };

}

function getAllTimeRevenue(orders){

    if(orders.length === 0){

        return {

            labels: [],
            revenueData: []

        };

    }

    const sortedOrders = [...orders].sort((a,b)=>

        a.createdAt.toDate() -
        b.createdAt.toDate()

    );

    const firstOrderDate =
        sortedOrders[0].createdAt.toDate();

    const now = new Date();

    const monthDifference =

        (now.getFullYear() - firstOrderDate.getFullYear()) * 12 +

        (now.getMonth() - firstOrderDate.getMonth());

    if(monthDifference <= 12){

        return getAllTimeMonthlyRevenue(
            orders,
            firstOrderDate
        );

    }

    return getAllTimeYearlyRevenue(
        orders,
        firstOrderDate
    );

}
function getAllTimeMonthlyRevenue(
    orders,
    firstOrderDate
){

    const labels = [];
    const revenueData = [];

    const current = new Date(
        firstOrderDate.getFullYear(),
        firstOrderDate.getMonth(),
        1
    );

    const now = new Date();

    while(current <= now){

        labels.push(

            current.toLocaleDateString("en-IN",{

                month:"short",
                year:"2-digit"

            })

        );

        let revenue = 0;

        orders.forEach(order=>{

            const orderDate =
                order.createdAt.toDate();

            if(

                orderDate.getMonth() === current.getMonth() &&
                orderDate.getFullYear() === current.getFullYear()

            ){

                revenue += Number(order.total || 0);

            }

        });

        revenueData.push(revenue);

        current.setMonth(
            current.getMonth() + 1
        );

    }

    return{

        labels,
        revenueData

    };

}
function getAllTimeYearlyRevenue(
    orders,
    firstOrderDate
){

    const labels = [];
    const revenueData = [];

    const startYear =
        firstOrderDate.getFullYear();

    const endYear =
        new Date().getFullYear();

    for(

        let year = startYear;

        year <= endYear;

        year++

    ){

        labels.push(
            String(year)
        );

        let revenue = 0;

        orders.forEach(order=>{

            const orderDate =
                order.createdAt.toDate();

            if(

                orderDate.getFullYear() === year

            ){

                revenue += Number(order.total || 0);

            }

        });

        revenueData.push(revenue);

    }

    return{

        labels,
        revenueData

    };

}