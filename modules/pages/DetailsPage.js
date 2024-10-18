import { getProductById } from "../services/DataLoading.js";
import { addToCart } from "../services/Order.js";

export default class DetailsPage extends HTMLElement {
    constructor() {
        super();

        this.root = this.attachShadow({ mode: "open" });

        const template = document.getElementById("details-page-template");
        const content = template.content.cloneNode(true);
        const styles = document.createElement("style");
        this.root.appendChild(content);
        this.root.appendChild(styles);

        async function loadCSS() {
            const request = await fetch("./modules/pages/DetailsPage.css"); 
            styles.textContent = await request.text();
        }
        loadCSS();
    }

    connectedCallback() {
        this.render();
    }

    async render() {
        if (this.dataset.productId) {
            this.product = await getProductById(this.dataset.productId);
            this.root.querySelector("img").src = `./data/images/${this.product.img}`;
            this.root.querySelector("h5").textContent = this.product.name;
            this.root.querySelector(".price").textContent = `Rp${this.product.price}`;
            this.root.querySelector(".desc-text").textContent = this.product.description;
            const totalPrice = this.root.querySelector(".total-price");

            const quantity = this.root.querySelector(".quantity>p");
            let q = Number(quantity.textContent);
            this.root.querySelector(".btn-remove").addEventListener("click", () => {
                if (q > 1) {
                    q--;
                    quantity.textContent = q;
                    totalPrice.textContent = `Rp.${(q * Number(this.product.price)).toFixed(2)}`;
                }
            });
            this.root.querySelector(".btn-add").addEventListener("click", () => {
                q++;
                quantity.textContent = q;
                totalPrice.textContent = `Rp.${(q * Number(this.product.price)).toFixed(2)}`;
            });

            totalPrice.textContent = `Rp.${(q * Number(this.product.price)).toFixed(2)}`;

            this.root.querySelector(".btn-primary").addEventListener("click", (e) => {
                const varient = this.root.querySelector("input[name='var-btnradio']:checked").value;
                const size = this.root.querySelector("input[name='size-btnradio']:checked").value;
                const sugar = this.root.querySelector("input[name='su-btnradio']:checked").value;
                const ice = this.root.querySelector("input[name='ice-btnradio']:checked").value;
                const customizedOrder = `${varient}, ${size}, ${sugar} Sugar, ${ice} Ice`;
                addToCart(this.product.id, q, customizedOrder);
            });
        }
        else {
            alert("Invalid Product Id.");    // --------------------
        }
    }
}

customElements.define("details-page", DetailsPage);