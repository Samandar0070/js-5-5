import { findElement } from "./main.js";
import { BASE_URL } from "./main.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const elTitle = findElement("#title")
const elPrice = findElement("#price")
const elCategory = findElement("#category")
const elImg = findElement("#img")


fetch(BASE_URL + "/products/" + id)
    .then((res) => res.json())
    .then((res) => {
        console.log(res);

        elTitle.textContent = res.title
        elPrice.textContent = res.price
        elCategory.textContent = res.category
        elImg.src = res.image
});