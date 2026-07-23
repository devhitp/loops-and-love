const orderId =
localStorage.getItem("orderId");

document.querySelector("#order-id").textContent =
orderId || "#LL000001";