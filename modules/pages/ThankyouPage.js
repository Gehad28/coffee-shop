export default class ThankyouPage extends HTMLElement {
    constructor() {
        super();

        this.root = this.attachShadow({ mode: "open" });

        const template = document.getElementById("thankyou-template");
        const content = template.content.cloneNode(true);
        const styles = document.createElement("style");
        this.root.appendChild(content);
        this.root.appendChild(styles);

        async function loadCSS() {
            const request = await fetch("./modules/pages/ThankyouPage.css");
            styles.textContent = await request.text();
        }
        loadCSS();
    }
}

customElements.define("thankyou-page", ThankyouPage);