import { removeFromCart } from "../services/Order.js";

export default class CartItem extends HTMLElement {
    constructor() {
        super();

        this.root = this.attachShadow({ mode: "open" });

        const template = document.getElementById("cart-item-template");
        const content = template.content.cloneNode(true);
        const styles = document.createElement("style");
        this.root.appendChild(content);
        this.root.appendChild(styles);

        styles.textContent = `
            .cart-item {
                display: flex;
                gap: 2rem;
                align-items: center;
                padding: 2rem;
                box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 15%);
            }

            .cart-item .image {
                position: relative;
                flex: 1;
            }

            .cart-item .bg-circle {
                background-color: rgba(86, 72, 60, 0.05);
                border-radius: 50%;
                width: 100%;
                height: 80%;
                left: 50%;
                top: 30%;
                transform: translate(-50%, -30%);
                position: absolute;
                z-index: 1;
            }

            .cart-item .image img {
                width: 100%;
                height: auto;
                z-index: 2;
            }

            .cart-item .order-details {
                flex: 3;
                display: flex;
                flex-direction: column;
                gap: 1rem;
                font-size: 1.4em;
                color: var(--paragraph-color);
            }

            .order-details .title,
            .order-details .details {
                display: flex;
                justify-content: space-between;
            }

            .order-details .title h5,
            .order-details .title p {
                color: var(--heading-color);
                font-size: 1.5em;
                font-weight: var(--font-medium);
            }

            .order-details .details p:first-child {
                flex: 2;
            }

            .order-details .details p:last-child {
                flex: 1;
                text-align: end;
            }

            .order-details .actions {
                display: flex;
                justify-content: end;
                align-items: center;
                gap: 1rem;
            }

            .order-details .actions svg {
                height: 100%;
                width: auto;
                cursor: pointer;
            }
        `;
    }

    connectedCallback() {
        const item = JSON.parse(this.dataset.item);
        this.root.querySelector("img").src = `./data/images/${item.product.img}`;
        this.root.querySelector("h5").textContent = item.product.name;
        this.root.querySelector(".title>p").textContent = item.product.price;
        this.root.querySelector(".custom-order").textContent = item.customOrder;
        this.root.querySelector(".quantity-no").textContent = `x${item.quantity}`;

        this.root.querySelector(".actions>svg").addEventListener("click", e => {
            removeFromCart(item.product.id);
        });
    }
}

customElements.define("cart-item", CartItem);