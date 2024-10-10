const Store = {
    menu: null,
    carousel: null,
    cart: []
}

const proxiedStore = new Proxy(Store, {
    set(target, property, value) {
        target[property] = value;
        if (property == "menu") {
            window.dispatchEvent(new Event("appmenuchange"));
        }
        if (property == "carousel") {
            window.dispatchEvent(new Event("appcarouselchange"));
        }
        if (property == "cart") {
            window.dispatchEvent(new Event("appcartchange"));
        }
        return true;
    },
    get(target, property) {
        return target[property];
    }
})

export default proxiedStore;