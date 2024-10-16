export default class ProductItem extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const template = document.getElementById("product-card-template");
        const content = template.content.cloneNode(true);

        this.appendChild(content);
        
        const product = JSON.parse(this.dataset.product);
        this.querySelector("h5").textContent = product.name;
        this.querySelector(".card-text").textContent = product.description;
        this.querySelector(".price").textContent = `Rp${product.price}`;
        this.querySelector("img").src = `./data/images/${product.img}`;
        this.querySelector("a").addEventListener("click", e => {
            app.router.go(`product/${product.id}`);
            e.preventDefault();
        });
    }
}

customElements.define("product-item", ProductItem);