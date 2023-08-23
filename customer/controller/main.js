import { Product } from "../model/model.js";
import { fetchData, renderProduct, showBgHeader } from "./controller.js";

let dataProducts = JSON.parse(localStorage.getItem("Products"));
let products = dataProducts.map((el) => {
  let { name, price, img, desc, type, screen, backCamera, frontCamera } = el;
  return new Product(
    name,
    price,
    img,
    desc,
    type,
    screen,
    backCamera,
    frontCamera
  );
});

const options = [
  {
    img: "../../assets/img/samsung.svg",
    text: "Samsung",
    type: "Samsung",
  },
  {
    img: "../../assets/img/apple.svg",
    text: "Iphone",
    type: "Iphone",
  },
];

let cart = [];

window.addEventListener("scroll", showBgHeader);

fetchData();

// Filter

const productFilters = [...options];

document.getElementById("options").innerHTML = productFilters
  .map((option) => {
    let { img, text, type } = option;
    return `
    <li class="option" onclick=filterProducts('${type}')>
    <img src=${img} alt="" />
    <span class="pl-4 option-text">${text}</span>
  </li>
    `;
  })
  .join("");

let categories = [...products];

const filterProducts = (item) => {
  const filterList = categories.filter((el) => {
    if (el.type == item) {
      return el.type;
    }
  });
  renderProduct(filterList);
};

window.filterProducts = filterProducts;

const optionMenu = document.querySelector(".select-menu");
const selectBtn = optionMenu.querySelector(".select-btn");
const optionBtns = optionMenu.querySelectorAll(".option");
const sBtn_text = optionMenu.querySelector(".sBtn-text");

const showDropdown = () => {
  optionMenu.classList.toggle("active");
};

const hideDropdown = () => {
  optionMenu.classList.toggle("active");
};

selectBtn.addEventListener("click", showDropdown);
optionBtns.forEach((btn) => {
  btn.addEventListener("click", hideDropdown);
});

window.addEventListener("click", function (e) {
  if (
    !document.querySelector(".select-menu").contains(e.target) &&
    optionMenu.classList.contains("active")
  ) {
    hideDropdown();
  }
});

const cartBtn = document.getElementById("cartBtn");
const overlayBg = document.getElementById("overlay");
const cartMenu = document.getElementById("cart-menu");

cartBtn.addEventListener("click", () => {
  cartMenu.classList.toggle("active");
  overlayBg.classList.toggle("hidden");
});

window.addEventListener("click", function (e) {
  if (overlayBg.contains(e.target)) {
    cartMenu.classList.toggle("active");
    overlayBg.classList.toggle("hidden");
  }
});
