function findElement(element, parent = document) {
    return parent.querySelector(element);
}

function renderProducts(products, parent) {
    parent.innerHTML = "";
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
                <button data-id="${element.id}" id="btn-delete" class="btn btn-primary w-50">delete</button>
            </div>
        `;

        parent.appendChild(newCard);
    });
}

const elCards = findElement(".cards");
const elSearchInput = findElement("#search-input");
let elBtnDelete = findElement("#btn-delete")
let favoriteProducts = [];
let products = [];


const BASE_URL = "https://64f4029b932537f4051a10f3.mockapi.io"

fetch(BASE_URL + "/products")
    .then((res) => res.json())
    .then((res) => {
        products = res;
        renderProducts(res, elCards);
       products = res
    })
    .catch((err) => {
        alert(err);
    });

renderProducts(products, elCards);

const elForm  = findElement("#form");
const elImage = findElement("#image")

elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const newProduct = JSON.stringify({
        title:evt.target.title.value,
        image: elImage.value,
        price: evt.target.price.value,
        createdAt: new Date().getTime()
    });

    fetch(BASE_URL + "/products/",{
        method: "POST",
        body:newProduct
    })
    .then((res) => res.json())
    .then((res) => {
        console.log(res)
    })
})

elSearchInput.addEventListener("input", (evt) => {

    const newArray = []
    products.forEach((products) => {
        if (products.name.official.toLowerCase().includes(elSearchInput.value.toLowerCase())) {
            newArray.push(products) 
        }
    });

    renderCountries(newArray, elCards)
});

elCards.addEventListener("click", (evt) => {
    if (evt.target.id === "btn-delete") {
      fetch(BASE_URL + `/products/${evt.target.dataset.id}`, {method: "DELETE",})
        .then((res) => res.json())
        .then((res) => {
          fetch(BASE_URL + "/products")
            .then((res) => res.json())
            .then((res) => {
              renderProducts(res, elCards);
            });
        });
    };
});