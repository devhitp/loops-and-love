export function renderRevenueChart(orders) {

    const canvas =
        document.querySelector("#revenue-chart");

    if (!canvas)
        return;

    if (window.revenueChart) {
        window.revenueChart.destroy();
    }

    const labels = [];
    const revenueData = [];

    for (let i = 6; i >= 0; i--) {

        const date = new Date();
        date.setDate(date.getDate() - i);

        labels.push(
            date.toLocaleDateString("en-IN", {
                weekday: "short"
            })
        );

        let dailyRevenue = 0;

        orders.forEach(order => {

            if (!order.createdAt)
                return;

            const orderDate =
                order.createdAt.toDate();

            const isSameDay =
                orderDate.getDate() === date.getDate() &&
                orderDate.getMonth() === date.getMonth() &&
                orderDate.getFullYear() === date.getFullYear();

            if (isSameDay) {
                dailyRevenue += Number(order.total || 0);
            }

        });

        revenueData.push(dailyRevenue);

    }

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