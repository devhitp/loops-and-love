// ===========================================
// WISHLIST COUNT
// ===========================================

function updateWishlistCount() {

    const wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

    const wishlistCount =
    document.querySelectorAll(".wishlist-count");

    wishlistCount.forEach(count => {

        count.textContent =
        wishlist.length;

    });

}


// ===========================================
// CART COUNT
// ===========================================

function updateCartCount() {

    const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    const totalItems =
    cart.reduce(

        (sum,item)=>

        sum + item.quantity,

        0

    );

    const cartCount =
    document.querySelectorAll(".cart-count");

    cartCount.forEach(count=>{

        count.textContent =
        totalItems;

    });

}

function showToast(title, message, type = "success"){

    const toast = document.getElementById("toast");

    const titleElement =
        document.getElementById("toast-title");

    const messageElement =
        document.getElementById("toast-message");

    const icon =
        toast.querySelector(".toast-icon");

    toast.className = "toast";

    toast.classList.add(type);

    switch(type){

        case "success":
            icon.innerHTML = "✓";
            break;

        case "info":
            icon.innerHTML = "🛒";
            break;

        case "warning":
            icon.innerHTML = "⚠";
            break;

        case "error":
            icon.innerHTML = "✕";
            break;

    }

    titleElement.textContent = title;

    messageElement.textContent = message;

    toast.classList.add("show");

    clearTimeout(toast.timer);

    toast.timer = setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}
// ===========================================
// PAGE LOAD ANIMATION
// ===========================================

window.addEventListener("load",()=>{

    document.body.classList.add("page-loaded");

});
// ===========================================
// RIPPLE EFFECT
// ===========================================

document.addEventListener("click",(event)=>{

    const button = event.target.closest(
        ".btn, .add-cart-btn, .wishlist-btn, .product-wishlist-btn"
    );

    if(!button) return;

    const ripple = document.createElement("span");

    ripple.className = "ripple";

    const rect = button.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);

    ripple.style.width = size + "px";
    ripple.style.height = size + "px";

    ripple.style.left =
        event.clientX - rect.left - size/2 + "px";

    ripple.style.top =
        event.clientY - rect.top - size/2 + "px";

    button.appendChild(ripple);

    ripple.addEventListener("animationend",()=>{

        ripple.remove();

    });

});
// ===========================================
// SCROLL TO TOP
// ===========================================

const scrollTopBtn =
document.getElementById("scroll-top-btn");

if(scrollTopBtn){

    window.addEventListener("scroll",()=>{

        scrollTopBtn.classList.toggle(
            "show",
            window.scrollY > 400
        );

    });

    scrollTopBtn.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

// ===========================================
// NAVBAR SEARCH
// ===========================================

const searchBtn =
document.querySelector(".search-btn");

if(searchBtn){

    searchBtn.addEventListener("click",()=>{

        window.location.href="shop.html";

    });

}
// ===========================================
// INITIALIZE
// ===========================================

updateWishlistCount();

updateCartCount();