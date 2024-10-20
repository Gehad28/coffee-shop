export default class CheckoutPage extends HTMLElement {
    #user = {
        name: "",
        email: "",
        phone: "",
        address: ""
    }

    constructor() {
        super();

        this.root = this.attachShadow({ mode: "open" });

        const template = document.getElementById("checkout-page-template");
        const content = template.content.cloneNode(true);
        const styles = document.createElement("style");
        this.root.appendChild(content);
        this.root.appendChild(styles);

        async function loadCSS() {
            const request = await fetch("./modules/pages/CheckoutPage.css"); // ./modules
            styles.textContent = await request.text();
        }
        loadCSS();
    }

    connectedCallback() {
        window.addEventListener("appcartchange", () => {
            this.render();
        });
        this.render();
    }

    render() {
        if (app.store.cart.length == 0) {
            this.root.querySelector(".cart").style.display = "none";
            this.root.querySelector(".empty-cart").style.display = "block";
        }
        else {
            this.root.querySelector(".empty-cart").style.display = "none";
            this.root.querySelector(".cart").style.display = "flex";

            let total = 0;
            this.root.querySelector(".cart-items").innerHTML = "";
            for (let itemInCart of app.store.cart) {
                const item = document.createElement("cart-item");
                item.dataset.item = JSON.stringify(itemInCart);
                this.root.querySelector(".cart-items").appendChild(item);
                total += itemInCart.quantity * itemInCart.product.price;
            }
            this.root.querySelector(".total-price").textContent = `Rp.${total.toFixed(2)}`;
            this.setFormBindings(this.root.querySelector("form"));
        }
    }

    setFormBindings(form) {
        this.root.querySelector(".btn-primary").addEventListener("click", e => {
            // After Checkout --------
            if (form.elements.name.value && form.elements.email.value && form.elements.phone.value && form.elements.address.value) {
                // alert("Thank you for your order.");
                this.#user.name = "";
                this.#user.email = "";
                this.#user.phone = "";
                this.#user.address = "";
                app.store.cart = [];
                localStorage.setItem("cart", JSON.stringify(app.store.cart));
                app.router.go("checkout");

                // Send to Server
            }
            else {
                this.root.querySelectorAll(".form-group input").forEach(input => {
                    if (!input.value) {
                        input.classList.add("validate");
                    }
                    else {
                        input.classList.remove("validate");
                    }
                });
            }
        });

        Array.from(form.elements).forEach(element => {
            if (element.name) {
                element.addEventListener("change", e => {
                    this.#user[element.name] = element.value;
                });
            }
        });
        this.#user = new Proxy(this.#user, {
            set(target, property, value) {
                target[property] = value;
                form.elements[property].value = value;
                return true;
            }
        });
    }
}

customElements.define("checkout-page", CheckoutPage);