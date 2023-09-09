export function findElement(element, parent = document) {
    return parent.querySelector(element);
}

function renderProducts(products, parent) {
    parent.innerHTML = null;
    products.forEach((element) => {
        const newCard = document.createElement("div");

        newCard.className = "col-3";

        newCard.innerHTML = `
            <div class="card">
                <img class="card-img-top" src="${element.image}" alt="${element.title}" />
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">$${element.price}</p>
                    <p class="card-text card-description">${element.description}</p>
                </div>
            </div>
        `;

        const elLink = findElement("#link");

        if(elLink){
            elLink.href = `http://127.0.0.1:5500/pages/single.html?id=${element.id}`
        }

        parent.appendChild(newCard);
    });
}

const elCards = findElement(".cards");
const elSearchInput = findElement("#search-input");
const registration = findElement(".registration")
const header = findElement(".header")
const registrationBtn = findElement("#auth-btn")
const emailInput = findElement("#auth-email");
const passwordInput = findElement("#auth-password");
let favoriteProducts = [];
let products = [];

export const BASE_URL = "https://64f4029b932537f4051a10f3.mockapi.io"

fetch(BASE_URL+"/products")
    .then((res) => res.json())
    .then((res) => {
        products = res;
        renderProducts(res, elCards);
        products = res
    })
    .catch((err) => {
        alert(err);
    });

let isLogin = localStorage.getItem("token") ? true : false;

if (isLogin) {
    registration.textContent = "Выйти";
    const newLink = document.createElement("a");
    newLink.href = "../pages/admin.html";
    newLink.textContent = "Админская страница";
    header.appendChild(newLink);
}
    
registrationBtn.addEventListener("click", () => {
    const obj = {
        email: emailInput.value,
        password: passwordInput.value,
    };

    const authPost = async () => {
        const res = await fetch("https://reqres.in/api/login", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json",
            },  
        });

        const data = await res.json();
        
        if(data.token){
            localStorage.setItem("token", data.token);

            const newLink = document.createElement("a");
            newLink.href = "../pages/admin.html";
            newLink.textContent = "Админская страница"
            header.appendChild(newLink)
            isLogin = true
            registrationBtn.textContent = "Выйти";
            localStorage.setItem("login",true)
        } 
    };
    authPost();
});

elSearchInput.addEventListener("input", (evt) => {

    const newArray = []
    products.forEach((products) => {
        if (products.name.official.toLowerCase().includes(elSearchInput.value.toLowerCase())) {
            newArray.push(products) 
        }
    });

    renderProducts(newArray, elCards)
});

renderProducts(products, elCards);