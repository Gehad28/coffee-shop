import Router from "./modules/services/Router.js";
import Store from "./modules/services/Store.js";
import { loadCarouel, loadMenu } from "./modules/services/DataLoading.js";
import API from "./modules/services/API.js";

// Pages
import "./modules/pages/HomePage.js";
import "./modules/components/ProducItem.js";


window.app = {};

app.router = Router;
app.store = Store;

window.addEventListener("DOMContentLoaded", () => {
    app.router.init();
    loadMenu();
    loadCarouel();
});