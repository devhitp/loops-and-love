// ===========================================
// GET CART
// ===========================================


const cart =
    JSON.parse(localStorage.getItem("cart")) || [];



const checkoutItems =
    document.querySelector("#checkout-items");

const customerName =
    document.querySelector("#customer-name");

const customerPhone =
    document.querySelector("#customer-phone");

const customerAddress =
    document.querySelector("#customer-address");

const customerCity =
    document.querySelector("#customer-city");

const customerPincode =
    document.querySelector("#customer-pincode");
const subtotalElement =
    document.querySelector("#checkout-subtotal");


const totalElement =
    document.querySelector("#checkout-total");



let subtotal = 0;



cart.forEach(item => {


    const product =
        products.find(
            p => p.id === item.id
        );



    if (!product) return;



    subtotal +=
        product.price * item.quantity;



    checkoutItems.innerHTML += `


<div class="checkout-product">


<span>

${product.name}

x${item.quantity}

</span>



<span>

₹${product.price * item.quantity}

</span>


</div>


`;


});



subtotalElement.textContent =
    `₹${subtotal}`;



totalElement.textContent =
    `₹${subtotal}`;


    
const placeOrderButton =
    document.querySelector(".place-order-btn");

const checkoutForm =
    document.querySelector("#checkout-form");

const form =
    document.querySelector("#checkout-form");

const nameInput =
    document.querySelector("#customer-name");

const phoneInput =
    document.querySelector("#customer-phone");

const addressInput =
    document.querySelector("#customer-address");

const cityInput =
    document.querySelector("#customer-city");

const pincodeInput =
    document.querySelector("#customer-pincode");

function showError(input, message){

    const group =
        input.parentElement;

    group.classList.remove("success");

    group.classList.add("error");

    group.querySelector(".error-message").textContent =
        message;

}

function showSuccess(input){

    const group =
        input.parentElement;

    group.classList.remove("error");

    group.classList.add("success");

    group.querySelector(".error-message").textContent =
        "";

}

function validateForm(){

    let valid = true;

    if(!/^[A-Za-z ]+$/.test(nameInput.value.trim())){

        showError(nameInput,"Enter a valid name.");

        valid = false;

    }else{

        showSuccess(nameInput);

    }

    if(!/^[6-9]\d{9}$/.test(phoneInput.value.trim())){

        showError(phoneInput,"Enter a valid 10-digit phone number.");

        valid = false;

    }else{

        showSuccess(phoneInput);

    }

    if(addressInput.value.trim().length < 10){

        showError(addressInput,"Address should be at least 10 characters.");

        valid = false;

    }else{

        showSuccess(addressInput);

    }

    if(!/^[A-Za-z ]+$/.test(cityInput.value.trim())){

        showError(cityInput,"Enter a valid city.");

        valid = false;

    }else{

        showSuccess(cityInput);

    }

    if(!/^\d{6}$/.test(pincodeInput.value.trim())){

        showError(pincodeInput,"Enter a valid 6-digit pincode.");

        valid = false;

    }else{

        showSuccess(pincodeInput);

    }

    return valid;

}


function validateField(input) {

    switch (input.id) {

        case "customer-name":

            if (!/^[A-Za-z ]+$/.test(input.value.trim())) {

                showError(
                    input,
                    "Enter a valid name."
                );

            } else {

                showSuccess(input);

            }

            break;

        case "customer-phone":

            if (!/^[6-9]\d{9}$/.test(input.value.trim())) {

                showError(
                    input,
                    "Enter a valid 10-digit phone number."
                );

            } else {

                showSuccess(input);

            }

            break;

        case "customer-address":

            if (input.value.trim().length < 10) {

                showError(
                    input,
                    "Address should be at least 10 characters."
                );

            } else {

                showSuccess(input);

            }

            break;

        case "customer-city":

            if (!/^[A-Za-z ]+$/.test(input.value.trim())) {

                showError(
                    input,
                    "Enter a valid city."
                );

            } else {

                showSuccess(input);

            }

            break;

        case "customer-pincode":

            if (!/^\d{6}$/.test(input.value.trim())) {

                showError(
                    input,
                    "Enter a valid 6-digit pincode."
                );

            } else {

                showSuccess(input);

            }

            break;

    }

}
[
    nameInput,
    phoneInput,
    addressInput,
    cityInput,
    pincodeInput
].forEach(input => {

    input.addEventListener("input", () => {

        validateField(input);

    });

});

phoneInput.addEventListener("input", () => {

    phoneInput.value =
        phoneInput.value.replace(/\D/g, "");

});

pincodeInput.addEventListener("input", () => {

    pincodeInput.value =
        pincodeInput.value.replace(/\D/g, "");

});
function saveCustomerDetails(){

    const customerDetails = {

        name: customerName.value.trim(),

        phone: customerPhone.value.trim(),

        address: customerAddress.value.trim(),

        city: customerCity.value.trim(),

        pincode: customerPincode.value.trim()

    };


    localStorage.setItem(

        "customerDetails",

        JSON.stringify(customerDetails)

    );

}
function loadCustomerDetails(){

    const savedDetails =
        JSON.parse(
            localStorage.getItem("customerDetails")
        );


    if(!savedDetails) return;


    customerName.value =
        savedDetails.name || "";


    customerPhone.value =
        savedDetails.phone || "";


    customerAddress.value =
        savedDetails.address || "";


    customerCity.value =
        savedDetails.city || "";


    customerPincode.value =
        savedDetails.pincode || "";

}


placeOrderButton.addEventListener("click",function(e){

    e.preventDefault();

    if(!validateForm()){

        showToast(

            "Invalid Details",

            "Please correct the highlighted fields.",

            "error"

        );

        return;

    }

    const orderId =
        "LL"+Date.now();

    saveCustomerDetails();


localStorage.setItem(

    "orderId",

    orderId

);


localStorage.removeItem("cart");

    window.location.href =
        "order-success.html";

});
loadCustomerDetails();