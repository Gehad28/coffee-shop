import { removeFromCart } from "../services/Order.js";

export default class CartItem extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const template = document.getElementById("cart-item-template");
        const content = template.content.cloneNode(true);
        this.appendChild(content);

        window.addEventListener("appcartchange", () => {
            this.render();
        })
    }

    render() {
        console.log("Cart Item");
        const item = JSON.parse(this.dataset.item);
        this.querySelector("img").src = `./data/images/${item.product.img}`;
        this.querySelector("h5").textContent = item.product.name;
        this.querySelector(".title>p").textContent = item.product.price;
        this.querySelector(".custom-order").textContent = item.customOrder;
        this.querySelector(".quantity-no").textContent = `x${item.quantity}`;

        this.querySelector(".actions>svg").addEventListener("click", e => {
            removeFromCart(item.product.id);
        });
    }
}

customElements.define("cart-item", CartItem);