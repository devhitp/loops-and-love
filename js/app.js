/* ==========================================
   FLOATING PRODUCT CARDS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const cards = [

        {
            element: document.querySelector(".floating-top"),
            amplitude: 10,
            speed: 0.0016,
            rotation: -8
        },

        {
            element: document.querySelector(".floating-left"),
            amplitude: 8,
            speed: 0.0013,
            rotation: 8
        },

        {
            element: document.querySelector(".floating-right"),
            amplitude: 9,
            speed: 0.0015,
            rotation: -6
        }

    ];

    function animate(time) {

        cards.forEach(card => {

            if (!card.element) return;

            const offset = Math.sin(time * card.speed) * card.amplitude;

            if (card.element.classList.contains("floating-top")) {

                card.element.style.transform =
                    `translateX(-50%) translateY(${offset}px) rotate(${card.rotation}deg)`;

            } else {

                card.element.style.transform =
                    `translateY(${offset}px) rotate(${card.rotation}deg)`;

            }

        });

        requestAnimationFrame(animate);

    }

    requestAnimationFrame(animate);

});

/* ==========================================
   MOBILE MENU
========================================== */

const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const menuOverlay = document.querySelector(".menu-overlay");

function openMenu() {

    mobileMenu.classList.add("active");

    menuOverlay.classList.add("active");

    document.body.classList.add("menu-open");

    menuBtn.querySelector("i").classList.replace("fa-bars", "fa-xmark");

}

function closeMenu() {

    mobileMenu.classList.remove("active");

    menuOverlay.classList.remove("active");

    document.body.classList.remove("menu-open");

    menuBtn.querySelector("i").classList.replace("fa-xmark", "fa-bars");

}

menuBtn.addEventListener("click", () => {

    if (mobileMenu.classList.contains("active")) {

        closeMenu();

    } else {

        openMenu();

    }

});

menuOverlay.addEventListener("click", closeMenu);

document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", closeMenu);

});

window.addEventListener("resize", () => {

    if (window.innerWidth > 767) {

        closeMenu();

    }

});

document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        closeMenu();

    }

});



const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 20) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});

const cards = document.querySelectorAll(".product-card");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("active");

        } else {

            entry.target.classList.remove("active");

        }

    });

}, {
    threshold: 0.6
});

cards.forEach(card => observer.observe(card));

function createCarousel(containerSelector, cardSelector) {

    const container = document.querySelector(containerSelector);

    if (!container) return;

    const cards = [...container.querySelectorAll(cardSelector)];

    let currentActive = null;

    function updateActiveCard() {

        const containerRect = container.getBoundingClientRect();

        const center = containerRect.left + containerRect.width / 2;

        let closestCard = null;
        let closestDistance = Infinity;

        cards.forEach(card => {

            const rect = card.getBoundingClientRect();

            const cardCenter = rect.left + rect.width / 2;

            const distance = Math.abs(center - cardCenter);

            if (distance < closestDistance) {

                closestDistance = distance;

                closestCard = card;

            }

        });

        if (currentActive !== closestCard) {

            if (currentActive) {
                currentActive.classList.remove("active");
            }

            closestCard.classList.add("active");

            currentActive = closestCard;

        }

    }

    updateActiveCard();

    container.addEventListener("scroll", updateActiveCard);

    window.addEventListener("resize", updateActiveCard);

}
createCarousel(".products-grid", ".product-card");

createCarousel(".why-grid", ".why-card");

createCarousel(".reviews-grid", ".review-card");
/* ===========================================
        GALLERY SCROLL REVEAL
=========================================== */

const galleryRows = document.querySelectorAll(".gallery-row");

const galleryObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.2
});

galleryRows.forEach(row => {

    galleryObserver.observe(row);

});