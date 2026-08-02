// ==========================================
// SETTINGS LOADER
// ==========================================

import { db } from "../firebase/firebase-config.js";

import {
    doc,
    getDoc
} from "firebase/firestore";

const settingsRef = doc(
    db,
    "settings",
    "config"
);

async function loadSettings() {

    try {

        const snapshot = await getDoc(
            settingsRef
        );

        if (!snapshot.exists()) return;

        const settings = snapshot.data();

        // ==========================================
        // THEME COLORS
        // ==========================================

        if (settings.primaryColor) {

            document.documentElement.style.setProperty(
                "--primary-color",
                settings.primaryColor
            );

        }

        if (settings.secondaryColor) {

            document.documentElement.style.setProperty(
                "--secondary-color",
                settings.secondaryColor
            );

        }

        if (settings.buttonColor) {

            document.documentElement.style.setProperty(
                "--button-color",
                settings.buttonColor
            );

        }

        // ==========================================
        // STORE INFORMATION
        // ==========================================

        document
            .querySelectorAll(".store-name")
            .forEach(element => {

                element.textContent =
                    settings.storeName || "Loops & Love";

            });

        document
            .querySelectorAll(".store-phone")
            .forEach(element => {

                element.textContent =
                    settings.storePhone || "";

            });

        document
            .querySelectorAll(".store-address")
            .forEach(element => {

                element.textContent =
                    settings.storeAddress || "";

            });

        document
            .querySelectorAll(".store-email")
            .forEach(link => {

                if (!settings.storeEmail) return;

                link.textContent =
                    settings.storeEmail;

                link.href =
                    `mailto:${settings.storeEmail}`;

            });

        // ==========================================
        // SOCIAL LINKS
        // ==========================================

        document
            .querySelectorAll(".instagram-link")
            .forEach(link => {

                if (settings.instagram)
                    link.href = settings.instagram;

            });

        document
            .querySelectorAll(".facebook-link")
            .forEach(link => {

                if (settings.facebook)
                    link.href = settings.facebook;

            });

        document
            .querySelectorAll(".whatsapp-link")
            .forEach(link => {

                if (settings.whatsapp)
                    link.href = settings.whatsapp;

            });

        document
            .querySelectorAll(".youtube-link")
            .forEach(link => {

                if (settings.youtube)
                    link.href = settings.youtube;

            });

    }

    catch (error) {

        console.error(
            "Error loading settings:",
            error
        );

    }

}

export async function getSettings() {

    const snapshot = await getDoc(settingsRef);

    if (!snapshot.exists()) {

        return {};

    }

    return snapshot.data();

}

loadSettings();