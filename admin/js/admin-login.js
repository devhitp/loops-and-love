// ==========================================
// FIREBASE ADMIN LOGIN
// ==========================================

console.log("Admin login JS loaded");
import {
    loginUser
} from "../../firebase/auth.js";



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

document.querySelector("#login-btn")
    .addEventListener(
        "click",
        async function (e) {


            // e.preventDefault();


            console.log("Trying Firebase login");

            const email =
                emailInput.value.trim();



            const password =
                passwordInput.value.trim();



            try {

                console.log("Before Firebase");
                await loginUser(
                    email,
                    password

                );
                console.log("After Firebase");


                // Redirect after successful login
                console.log("Login successful");
                window.location.href =
                    "/admin/admin-dashboard.html";



            }
            catch (error) {


                errorMessage.textContent =
                    "Invalid email or password.";


                console.log(error.message);


            }



        });