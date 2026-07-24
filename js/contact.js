// ==========================================
// CONTACT FORM VALIDATION
// ==========================================


const contactForm =
    document.querySelector("#contact-form");


const contactName =
    document.querySelector("#contact-name");


const contactEmail =
    document.querySelector("#contact-email");


const contactMessage =
    document.querySelector("#contact-message");




// ==========================================
// SHOW ERROR
// ==========================================


function showContactError(input, message) {


    const group =
        input.parentElement;


    group.classList.remove("success");

    group.classList.add("error");


    group.querySelector(".error-message")
        .textContent = message;


}





// ==========================================
// SHOW SUCCESS
// ==========================================


function showContactSuccess(input) {


    const group =
        input.parentElement;


    group.classList.remove("error");

    group.classList.add("success");


    group.querySelector(".error-message")
        .textContent = "";


}





// ==========================================
// VALIDATE FORM
// ==========================================


function validateContactForm() {


    let valid = true;



    // NAME


    if (
        contactName.value.trim().length < 3
    ) {

        showContactError(
            contactName,
            "Please enter your name."
        );


        valid = false;


    }
    else {


        showContactSuccess(contactName);


    }






    // EMAIL


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



    if (
        !emailPattern.test(
            contactEmail.value.trim()
        )
    ) {


        showContactError(
            contactEmail,
            "Enter a valid email address."
        );


        valid = false;


    }
    else {


        showContactSuccess(contactEmail);


    }







    // MESSAGE


    if (
        contactMessage.value.trim().length < 10
    ) {


        showContactError(
            contactMessage,
            "Message should be at least 10 characters."
        );


        valid = false;


    }
    else {


        showContactSuccess(contactMessage);


    }



    return valid;


}





// ==========================================
// SUBMIT
// ==========================================


contactForm.addEventListener(
    "submit",
    function (e) {


        e.preventDefault();



        if (!validateContactForm()) {


            showToast(

                "Invalid Details",

                "Please check your form.",

                "error"

            );


            return;


        }




        showToast(

            "Message Sent ❤️",

            "Thanks for reaching out. We'll get back to you soon.",

            "success"

        );




        contactForm.reset();




        document
            .querySelectorAll(".form-group")
            .forEach(group => {


                group.classList.remove(
                    "success",
                    "error"
                );


            });



    });