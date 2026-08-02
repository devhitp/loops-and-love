// ==========================================
// ADMIN SETTINGS
// ==========================================

// ==========================================
// STORE INFORMATION
// ==========================================
import { db } from "../../firebase/firebase-config.js";
import {
    showToast
} from "./admin-toast.js";
import {
    doc,
    getDoc,
    updateDoc
} from "firebase/firestore";

const settingsRef = doc(
    db,
    "settings",
    "config"
);

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

async function loadSettings() {

    try {

        const snapshot = await getDoc(
            settingsRef
        );

        if (!snapshot.exists())
            return;

        const settings = snapshot.data();

        storeName.value =
            settings.storeName || "";

        storeEmail.value =
            settings.storeEmail || "";

        storePhone.value =
            settings.storePhone || "";

        storeAddress.value =
            settings.storeAddress || "";

        shippingCharge.value =
            settings.shippingCharge ?? 50;

        freeShippingLimit.value =
            settings.freeShippingLimit ?? 999;

        taxRate.value =
            settings.taxRate ?? 0;

        instagramLink.value =
            settings.instagram || "";

        facebookLink.value =
            settings.facebook || "";

        whatsappLink.value =
            settings.whatsapp || "";

        youtubeLink.value =
            settings.youtube || "";

        primaryColor.value =
            settings.primaryColor || "#e98ca8";

        secondaryColor.value =
            settings.secondaryColor || "#fff0f3";

        buttonColor.value =
            settings.buttonColor || "#e98ca8";

    } catch (error) {

        console.error(
            "Error loading settings:",
            error
        );

    }

}

// Save settings

saveButton.addEventListener(
    "click",
    async () => {

        try {

            await updateDoc(
                settingsRef,
                {

                    storeName:
                        storeName.value.trim(),

                    storeEmail:
                        storeEmail.value.trim(),

                    storePhone:
                        storePhone.value.trim(),

                    storeAddress:
                        storeAddress.value.trim()

                }
            );

            showToast(
                "Store information saved successfully!"
            );

        } catch (error) {

            console.error(error);

            showToast(
                "Failed to save settings."
            );
        }

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

// Save

saveBusinessButton.addEventListener(
    "click",
    async () => {

        try {

            await updateDoc(
                settingsRef,
                {
                    shippingCharge: Number(shippingCharge.value),
                    freeShippingLimit: Number(freeShippingLimit.value),
                    taxRate: Number(taxRate.value)
                }
            );

            showToast("Business settings saved!");

        }

        catch (error) {

            console.error(error);

            showToast("Failed to save business settings.");

        }

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

// Save

saveSocialButton.addEventListener(
    "click",
    async () => {

        try {

            await updateDoc(
                settingsRef,
                {
                    instagram: instagramLink.value.trim(),
                    facebook: facebookLink.value.trim(),
                    whatsapp: whatsappLink.value.trim(),
                    youtube: youtubeLink.value.trim()
                }
            );

            showToast("Social links saved!");

        }

        catch (error) {

            console.error(error);

            showToast("Failed to save social links.");

        }

    }
);
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

// Save theme


saveThemeButton.addEventListener(
    "click",
    async () => {

        try {

            await updateDoc(
                settingsRef,
                {
                    primaryColor: primaryColor.value,
                    secondaryColor: secondaryColor.value,
                    buttonColor: buttonColor.value
                }
            );

            showToast("Theme settings saved!");

        }

        catch (error) {

            console.error(error);

            showToast("Failed to save theme settings.");

        }

    }
);
loadSettings();