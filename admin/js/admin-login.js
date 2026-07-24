// ==========================================
// ADMIN LOGIN SYSTEM
// ==========================================


// Default admin credentials (temporary)

const ADMIN_EMAIL = "admin@loopsandlove.com";

const ADMIN_PASSWORD = "admin123";




// Get elements

const loginForm =
document.querySelector("#admin-login-form");


const emailInput =
document.querySelector("#admin-email");


const passwordInput =
document.querySelector("#admin-password");


const errorMessage =
document.querySelector("#login-error");





// ==========================================
// LOGIN FUNCTION
// ==========================================


loginForm.addEventListener(
"submit",
function(e){


    e.preventDefault();



    const email =
    emailInput.value.trim();



    const password =
    passwordInput.value.trim();




    if(
        email === ADMIN_EMAIL &&
        password === ADMIN_PASSWORD
    ){


        // Save login state

        localStorage.setItem(
            "adminLoggedIn",
            "true"
        );



        // Redirect

        window.location.href =
        "admin-dashboard.html";



    }
    else{


        errorMessage.textContent =
        "Invalid email or password.";


    }



});
