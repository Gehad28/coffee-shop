export default class HomePage extends HTMLElement {
    constructor() {
        super();

        this.root = this.attachShadow({ mode: "open" });

        const template = document.getElementById("home-page-template");
        const content = template.content.cloneNode(true);
        const styles = document.createElement("style");
        this.root.appendChild(content);
        this.root.appendChild(styles);

        async function loadCSS() {
            const request = await fetch("./modules/pages/HomePage.css");
            styles.textContent = await request.text();
        }
        loadCSS();
    }

    connectedCallback() {
        this.renderMenu();
        this.renderCarousel();
        this.carousel();
        window.addEventListener("appmenuchange", () => {
            this.renderMenu();
        });
        window.addEventListener("appcarouselchange", () => {
            this.renderCarousel();
            this.carousel();
        });
    }

    renderMenu() {
        if (app.store.menu) {
            const menu = this.root.querySelector("#menu");
            menu.innerHTML = "";
            // let mostPopularMenu = app.store.menu.slice(0, 6);
            // if (window.innerWidth <= 768) {
            //     mostPopularMenu = app.store.menu;
            // }
            for (let product of app.store.menu) {
                const item = document.createElement("product-item");
                item.dataset.product = JSON.stringify(product);
                menu.appendChild(item);
            }

            this.root.querySelector("#order-btn").addEventListener("click", e => {
                const targetPos = this.root.querySelector("#menu");
                const topPos = targetPos.getBoundingClientRect().top + window.pageYOffset - 280;
                window.scrollTo({
                    top: topPos,
                    behavior: "smooth"
                });
            });
        }
        else {
            this.root.querySelector("#menu").innerHTML = "Loading...";
        }
    }

    renderCarousel() {
        if (app.store.carousel) {
            const carousel = this.root.querySelector(".carousel");
            const indicators = this.root.querySelector(".carousel-indicators");
            for (let img of app.store.carousel) {
                const carouselPhoto = document.createElement("div");
                carouselPhoto.classList.add("carousel__photo");
                const image = document.createElement("img");
                image.src = `./images/${img.img}`;
                carouselPhoto.appendChild(image);
                const indicator = document.createElement("div");
                indicator.classList.add("carousel__button");
                if (img == app.store.carousel[0]) {
                    carouselPhoto.classList.add("active");
                    indicator.classList.add("active");
                }
                indicators.appendChild(indicator);
                carousel.appendChild(carouselPhoto);
            }
        }
    }

    carousel() {
        if (app.store.carousel) {
            const items = this.root.querySelectorAll('.carousel__photo');
            const indicators = this.root.querySelectorAll('.carousel__button');
            let currentIndex = 0;
            const totalItems = items.length;
            const intervalTime = 3000; // Change slide every 3 seconds
    
            function showSlide(index) {
                // Remove the "active" class from the current slide
                items[currentIndex].classList.remove('active');
                indicators[currentIndex].classList.remove('active');
                
                // Update the current index to the new one
                currentIndex = index;
                
                // Add the "active" class to the new slide
                items[currentIndex].classList.add('active');
                indicators[currentIndex].classList.add('active');
            }
    
            function nextSlide() {
                // Move to the next slide, wrapping around at the end
                const newIndex = (currentIndex + 1) % totalItems;
                showSlide(newIndex);
            }
    
            // Start autoplay
            setInterval(nextSlide, intervalTime);
    
            // Initialize first slide as active
            showSlide(currentIndex);
    
        }
    }
}

customElements.define("home-page", HomePage);