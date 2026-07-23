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

function showToast(title, message){

    const toast = document.getElementById("toast");

    const toastTitle =
    document.getElementById("toast-title");

    const toastMessage =
    document.getElementById("toast-message");

    toastTitle.textContent = title;

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}

// ===========================================
// INITIALIZE
// ===========================================

updateWishlistCount();

updateCartCount();