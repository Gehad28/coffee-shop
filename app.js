import Router from "./modules/services/Router.js";
import Store from "./modules/services/Store.js";
import { loadCarouel, loadMenu } from "./modules/services/DataLoading.js";
import API from "./modules/services/API.js";

// Pages
import "./modules/pages/HomePage.js";
import "./modules/components/ProducItem.js";
// import "./modules/pages/DetailsPage.js";
// import "./modules/components/CartItem.js";
// import "./modules/pages/CheckoutPage.js";
// import "./modules/pages/ThankyouPage.js";


window.app = {};

app.router = Router;
app.store = Store;

window.addEventListener("DOMContentLoaded", () => {
    app.router.init();
    loadMenu();
    loadCarouel();
});

window.addEventListener("appcartchange", e => {
    const badge = document.querySelector("#badge");
    const badgeText = badge.querySelector("span");
    const quantity = app.store.cart.reduce((acc, item) => acc + item.quantity, 0);
    badgeText.textContent = quantity;
    badge.hidden = quantity == 0;
});

window.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("nav");
    window.addEventListener("scroll", e => {
        let scrollY = window.scrollY || window.pageYOffset;
        if (scrollY > nav.offsetTop) {
            nav.classList.add("nav-fixed");
        }
        else {
            nav.classList.remove("nav-fixed");
        }
    });
});

document.getElementById("cart-btn").addEventListener("click", e => {
    app.router.go("cart");
});