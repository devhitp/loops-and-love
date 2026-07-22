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
   MOBILE MENU TOGGLE
========================================== */
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });
}
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

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.2
});

galleryRows.forEach(row => {

    galleryObserver.observe(row);

});