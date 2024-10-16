import { getProductById } from "./DataLoading.js";

export async function addToCart(id, q, customOrder) {
    const product = await getProductById(id);
    const results = app.store.cart.filter(productInCart => productInCart.product.id == id);
    if (results.length >= 1) {
        app.store.cart = app.store.cart.map(p => p.product.id == id ? {...p, quantity: p.quantity + q, customOrder} : p);
    }
    else {
        app.store.cart = [...app.store.cart, {product, quantity: q, customOrder: customOrder}];
    }
}

export function removeFromCart(id) {
    app.store.cart = app.store.cart.filter(p => p.product.id != id);
}