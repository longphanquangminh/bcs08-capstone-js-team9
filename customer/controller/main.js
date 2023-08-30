import { Cart } from "../model/model.js";
import {
  BASE_URL,
  fetchData,
  findIndex,
  renderCart,
  renderProduct,
  showBgHeader,
  showToastMessage,
} from "./controller.js";

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

let dataJSON = localStorage.getItem("Cart");
if (dataJSON) {
  cart = JSON.parse(dataJSON).map((el) => {
    let { id, name, price, img, screen, backCamera, frontCamera, quality } = el;
    return new Cart(id, name, price, img, screen, backCamera, frontCamera);
  });
}

fetchData();
renderCart(cart);

// Filter Product

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

window.filterProducts = (item) => {
  axios
    .get(BASE_URL)
    .then((result) => {
      let filterData = result.data.filter((el) => el.type == item);
      renderProduct(filterData);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Add Cart

window.addProductToCart = (id) => {
  axios
    .get(`${BASE_URL}/${id}`)
    .then((result) => {
      let { id, name, price, img, screen, backCamera, frontCamera } =
        result.data;
      let cartItem = new Cart(
        id,
        name,
        price,
        img,
        screen,
        backCamera,
        frontCamera
      );
      let index = findIndex(cartItem.id, cart);
      if (index == -1) {
        cart.push(cartItem);
      } else {
        cart[index].quality += 1;
      }
      localStorage.setItem("Cart", JSON.stringify(cart));
      renderCart(cart);
      showToastMessage("Thêm sản phẩm thành công", true);
    })
    .catch((err) => {
      showToastMessage("Thêm sản phẩm thất bại", false);
      console.log(err);
    });
};

// Remove Cart

window.removeProduct = (id) => {
  const index = findIndex(id, cart);
  cart.splice(index, 1);
  localStorage.setItem("Cart", JSON.stringify(cart));
  renderCart(cart);
  showToastMessage("Xóa sản phẩm thành công", true);
};

// Increase / Decrease Quantity

window.increaseProduct = (id) => {
  let index = findIndex(id, cart);
  cart[index].quality += 1;
  renderCart(cart);
};
window.decreaseProduct = (id) => {
  let index = findIndex(id, cart);
  if (cart[index].quality > 1) {
    cart[index].quality -= 1;
  }

  renderCart(cart);
};

window.addEventListener("scroll", showBgHeader);

// Show/Hide Dropdown
const optionMenu = document.querySelector(".select-menu");
const selectBtn = optionMenu.querySelector(".select-btn");
const optionBtns = optionMenu.querySelectorAll(".option");

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

// Show/Hide Cart Menu

const cartBtn = document.getElementById("cartBtn");
const overlayBg = document.getElementById("overlay");
const cartMenu = document.getElementById("cart-menu");

const toggleModal = () => {
  cartMenu.classList.toggle("active");
  overlayBg.classList.toggle("hidden");
};

cartBtn.addEventListener("click", () => {
  toggleModal();
});

window.addEventListener("click", function (e) {
  if (overlayBg.contains(e.target)) {
    toggleModal();
  }
});

document.getElementById("backToStore").addEventListener("click", () => {
  toggleModal();
});

document.getElementById("removeAllBtn").addEventListener("click", () => {
  if (cart.length !== 0) {
    cart = [];
    renderCart(cart);
    showToastMessage("Xóa thành công", true);
  } else {
    showToastMessage("Bạn chưa có sản phẩm để xóa", false);
  }

  localStorage.setItem("Cart", JSON.stringify(cart));
});
document.getElementById("paymentBtn").addEventListener("click", () => {
  if (cart.length !== 0) {
    cart = [];
    renderCart(cart);
    showToastMessage("Thanh toán thành công", true);
    localStorage.setItem("Cart", JSON.stringify(cart));
    toggleModal();
  } else {
    showToastMessage("Bạn chưa có sản phẩm để thanh toán", false);
  }
});
