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
            case "/":
                pageElement = document.createElement("home-page");
                break;
            case "/menu":
                break;
            case "/history":
                break;
            case "/account":
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