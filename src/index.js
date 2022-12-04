import "./style.css";
import SPARouter from "./router/sparouter.js";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";

const section = document.querySelector("section");

const options = {
    historyMode: true,
};
const router = new SPARouter(options);

router
    .get("/", (req, router) => {
        section.innerHTML = Home();

        console.log(`Welcome to my home page! The request url is ${req.url}`);
        // console.log(router.pathFor("home"));
        window.query = req.query;
    })
    .setName("home");

router
    .get("/about", (req, router) => {
        section.innerHTML = About();
        console.log(`Welcome to about page! The request url is ${req.url}`);
    })
    .setName("about");

router.get("/products", (req, router) => (section.innerHTML = Products())).setName("products");

router.notFoundHandler((req, router) => {
    console.log("oops! the page you are looking for is probably eaten by a snake");
    router.goTo("home");
});

router.init();

document.addEventListener("click", (event) => {
    const { target } = event;

    if (target instanceof HTMLAnchorElement) {
        event.preventDefault();

        // router.goTo(target.href);
        console.log(router);
    }
});

window.router = router;
