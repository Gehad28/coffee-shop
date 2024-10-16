import API from "./API.js";

export async function loadMenu() {
    const data = await API.fetchData("./data/data.json");
    app.store.menu = data;
}

export async function loadCarouel() {
    const images = await API.fetchData("./data/carousel.json");
    app.store.carousel = images;
}

export async function getProductById(id) {
    if (!app.store.menu) {
        await loadMenu();
    }
    for (let p of app.store.menu) {
        if (p.id == id) {
            return p;
        }
    }
    return null;
}