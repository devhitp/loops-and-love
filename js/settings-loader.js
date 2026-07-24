// ==========================================
// SETTINGS LOADER
// ==========================================


const settings = 
JSON.parse(
    localStorage.getItem("settings")
) || {};




// APPLY THEME COLORS

if(settings.primaryColor){

    document.documentElement.style
    .setProperty(
        "--primary-color",
        settings.primaryColor
    );

}


if(settings.secondaryColor){

    document.documentElement.style
    .setProperty(
        "--secondary-color",
        settings.secondaryColor
    );

}


if(settings.buttonColor){

    document.documentElement.style
    .setProperty(
        "--button-color",
        settings.buttonColor
    );

}




// UPDATE STORE INFORMATION


document
.querySelectorAll(".store-name")
.forEach(element=>{


    element.textContent =
    settings.storeName || "Loops & Love";


});





document
.querySelectorAll(".store-phone")
.forEach(element=>{


    element.textContent =
    settings.storePhone || "";


});





document
.querySelectorAll(".store-email")
.forEach(link=>{


    if(settings.storeEmail){

        link.textContent =
        settings.storeEmail;


        link.href =
        `mailto:${settings.storeEmail}`;

    }


});





// SOCIAL LINKS


document
.querySelectorAll(".instagram-link")
.forEach(link=>{

    if(settings.instagram){

        link.href = settings.instagram;

    }

});



document
.querySelectorAll(".whatsapp-link")
.forEach(link=>{


    if(settings.whatsapp){

    link.href = settings.whatsapp;

}


});
// ==========================================
// ADDRESS
// ==========================================


document
.querySelectorAll(".store-address")
.forEach(element=>{


    element.textContent =
    settings.storeAddress || "";


});
document
.querySelectorAll(".store-phone")
.forEach(link=>{


    if(settings.storePhone){

        link.textContent =
        settings.storePhone;

    }


});