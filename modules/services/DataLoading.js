import API from "./API.js";

export async function loadMenu() {
    const data = await API.fetchData("/data/data.json");
    app.store.menu = data;
}

export async function loadCarouel() {
    const images = await API.fetchData("/data/carousel.json");
    app.store.carousel = images;
}