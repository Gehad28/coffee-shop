const Router = {
    init: () => {
        document.querySelectorAll("a.nav-link").forEach(link => {
            link.addEventListener("click", e => {
                e.preventDefault();
                const href = e.target.getAttribute("href");
                Router.go(href);
            });
        });
        window.addEventListener("popstate", e => {
            Router.go(e.state.route, false);
        });
        // Initial URL
        Router.go(location.pathname);
    },
    go: (route, addToHistory=true) => {
        if (addToHistory) {
            history.pushState({ route }, '', route);
        }
        let pageElement = null;
        switch(route) {
            case "/coffee-shop/":
                pageElement = document.createElement("home-page");
                break;
            case "/coffee-shop/menu":  // /coffee-shop/
                break;
            case "/coffee-shop/cart": // /coffee-shop/
                pageElement = document.createElement("checkout-page");
                break;
            // case "./account":
            //     break;
            default: 
                if (route.startsWith("/coffee-shop/product-")) {
                    pageElement = document.createElement("details-page");
                    pageElement.dataset.productId = route.substring(route.lastIndexOf("-")+1);
                }
                break;
        }
        if (pageElement) {
            function changePage() {
                const main = document.querySelector("main");
                let currentPage = main.firstElementChild;
                if (currentPage) {
                    currentPage.remove();
                    main.appendChild(pageElement);
                }
                else {
                    main.appendChild(pageElement);
                }
            }
            // Transition here
            changePage();
        }

        window.scrollX = 0;
    }
}

export default Router;