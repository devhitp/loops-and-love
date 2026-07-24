// ==========================================
// ADMIN SETTINGS
// ==========================================

// ==========================================
// STORE INFORMATION
// ==========================================

const storeName =
    document.querySelector("#store-name");

const storeEmail =
    document.querySelector("#store-email");

const storePhone =
    document.querySelector("#store-phone");

const storeAddress =
    document.querySelector("#store-address");

const saveButton =
    document.querySelector("#save-store-info");



// Load existing settings

const settings =
    JSON.parse(
        localStorage.getItem("settings")
    ) || {};

storeName.value =
    settings.storeName || "";

storeEmail.value =
    settings.storeEmail || "";

storePhone.value =
    settings.storePhone || "";

storeAddress.value =
    settings.storeAddress || "";



// Save settings

saveButton.addEventListener(
    "click",
    () => {

        const updatedSettings = {

            ...settings,

            storeName:
                storeName.value.trim(),

            storeEmail:
                storeEmail.value.trim(),

            storePhone:
                storePhone.value.trim(),

            storeAddress:
                storeAddress.value.trim()

        };

        localStorage.setItem(
            "settings",
            JSON.stringify(updatedSettings)
        );

        showToast(
            "Store information saved successfully!",
            "success"
        );

    }
);
// ==========================================
// BUSINESS SETTINGS
// ==========================================

const shippingCharge =
    document.querySelector("#shipping-charge");

const freeShippingLimit =
    document.querySelector("#free-shipping-limit");

const taxRate =
    document.querySelector("#tax-rate");

const saveBusinessButton =
    document.querySelector("#save-business-settings");



// Load values

shippingCharge.value =
    settings.shippingCharge ?? 50;

freeShippingLimit.value =
    settings.freeShippingLimit ?? 999;

taxRate.value =
    settings.taxRate ?? 0;



// Save

saveBusinessButton.addEventListener(
    "click",
    () => {

        const updatedSettings = {

            ...JSON.parse(
                localStorage.getItem("settings")
            ),

            shippingCharge:
                Number(shippingCharge.value),

            freeShippingLimit:
                Number(freeShippingLimit.value),

            taxRate:
                Number(taxRate.value)

        };

        localStorage.setItem(
            "settings",
            JSON.stringify(updatedSettings)
        );

        showToast(
            "Business settings saved!",
            "success"
        );

    }
);

// ==========================================
// SOCIAL MEDIA SETTINGS
// ==========================================


const instagramLink =
document.querySelector("#instagram-link");


const facebookLink =
document.querySelector("#facebook-link");


const whatsappLink =
document.querySelector("#whatsapp-link");


const youtubeLink =
document.querySelector("#youtube-link");


const saveSocialButton =
document.querySelector("#save-social-settings");




// Load existing values


instagramLink.value =
settings.instagram || "";


facebookLink.value =
settings.facebook || "";


whatsappLink.value =
settings.whatsapp || "";


youtubeLink.value =
settings.youtube || "";




// Save


saveSocialButton.addEventListener(
"click",
()=>{


const updatedSettings = {


    ...JSON.parse(
        localStorage.getItem("settings")
    ),


    instagram:
    instagramLink.value.trim(),


    facebook:
    facebookLink.value.trim(),


    whatsapp:
    whatsappLink.value.trim(),


    youtube:
    youtubeLink.value.trim()


};



localStorage.setItem(

    "settings",

    JSON.stringify(updatedSettings)

);



showToast(
"Social links saved!",
"success"
);



});
// ==========================================
// THEME SETTINGS
// ==========================================


const primaryColor =
document.querySelector("#primary-color");


const secondaryColor =
document.querySelector("#secondary-color");


const buttonColor =
document.querySelector("#button-color");


const saveThemeButton =
document.querySelector("#save-theme-settings");





// Load existing colors


primaryColor.value =
settings.primaryColor || "#e98ca8";


secondaryColor.value =
settings.secondaryColor || "#fff0f3";


buttonColor.value =
settings.buttonColor || "#e98ca8";





// Save theme


saveThemeButton.addEventListener(
"click",
()=>{


const updatedSettings = {


    ...JSON.parse(
        localStorage.getItem("settings")
    ),


    primaryColor:
    primaryColor.value,


    secondaryColor:
    secondaryColor.value,


    buttonColor:
    buttonColor.value


};



localStorage.setItem(

    "settings",

    JSON.stringify(updatedSettings)

);



showToast(
"Theme saved successfully!",
"success"
);



});