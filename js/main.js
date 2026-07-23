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



// ===========================================
// INITIALIZE
// ===========================================

updateWishlistCount();

updateCartCount();