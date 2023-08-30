export const BASE_URL =
  "https://64e1b8e7ab00373588185a1c.mockapi.io/api/v1/products";

export function fetchData() {
  axios
    .get(BASE_URL)
    .then((result) => {
      let products = result.data;
      renderProduct(products);
      localStorage.setItem("Products", JSON.stringify(products));
    })
    .catch((err) => {
      console.log(err);
    });
}

export let renderProduct = (data) => {
  let contentHTML = "";
  data.forEach((el) => {
    let { id, name, price, img, desc, type, screen, backCamera, frontCamera } =
      el;
    let contentDiv = /*html*/ `
        
        <div class="product-item flex flex-col justify-normal sm:justify-center min-w-[284px]">
            <img
            class="h-[200px] object-contain"
              src=${img}
              alt=${name}
            />
            <h3>${name}</h3>
            <h4>$ ${price.toLocaleString()}</h4>
            <span class="type">${type}</span>
            <p>
            ${desc}
            </p>
            <div class="rating">
              <div class="stars">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star-half-stroke"></i>
              </div>
              <div class="like">
                <i class="fa-solid fa-heart"></i>
              </div>
            </div>
            <div
              class="absolute top-0 left-0 w-full h-full bg-[#000]/[0.5] rounded-[10px] py-10 px-5 text-center text-white overlay"
            >
              <h6 class="text-white text-[20px] font-bold mb-16">
                Thông số chi tiết
              </h6>
              <div class="text-left mb-28">
                <p><b>Màn hình:</b> <span>${screen}</span></p>
                <p><b>Camera sau:</b> <span>${backCamera}</span></p>
                <p><b>Camera trước:</b> <span>${frontCamera}</span></p>
              </div>
              <button onclick="addProductToCart('${id}')" class="button">Thêm vào giỏ hàng</button>
            </div>
          </div>
        
        `;
    contentHTML += contentDiv;
  });
  document.getElementById("products").innerHTML = contentHTML;
};

export function showBgHeader() {
  window.scrollY > 50
    ? (document.querySelector(".header").style.background = "#000")
    : (document.querySelector(".header").style.background = "transparent");
}

export let renderCart = (cartData) => {
  let contentHTML = "";
  let total = 0;
  cartData.forEach((el) => {
    let { id, name, price, img, screen, backCamera, frontCamera, quality } = el;
    let totalProduct = quality * price;
    let contentItem = /*html*/ `
    <div
            class="p-4 mb-5 rounded-xl shadow-md hover:shadow-xl duration-300 cart-item"
          >
            <div class="flex gap-7 mb-4 item-top">
              <img src=${img} class="w-2/6 md:w-2/5" alt="" />
              <div class="w-3/5 item-desc">
                <h4 class="text-xl font-semibold mb-2">${name}</h4>
                <p>
                  <span class="">Màn hình:</span>
                  <span class="text-gray-500">${screen}</span>
                </p>
                <p>
                  <span class="">Camera sau:</span>
                  <span class="text-gray-500">${backCamera}</span>
                </p>
                <p>
                  <span class="">Camera trước:</span>
                  <span class="text-gray-500">${frontCamera}</span>
                </p>
                <button
                  class="p-2 rounded-lg bg-red-500 hover:bg-red-600 duration-300 text-white mt-3"
                  onclick='removeProduct(${id})'
                >
                  Xóa
                </button>
              </div>
            </div>
            <div class="flex justify-between items-center item-bot">
              <div class="text-teal-800">
                <span class="font-semibold">Quantity:</span>
                <span class="cursor-pointer text-xl mx-1" onclick=" decreaseProduct(${id})">
                  <i class="fa-solid fa-circle-minus"></i>
                </span>
                <span class="text-lg">${quality}</span>
                <span class="cursor-pointer text-xl mx-1" onclick="increaseProduct(${id})">
                  <i class="fa-solid fa-circle-plus"></i>
                </span>
              </div>
              <div class="text-green-800 font-semibold item-price">
                $ ${price}
              </div>
            </div>
          </div>
    
    `;
    contentHTML += contentItem;
    total += totalProduct;
  });

  document.querySelector("#quantity").innerText = cartData.length;
  document.querySelector("#cart-list").innerHTML = contentHTML;
  document.querySelector("#totalProduct").innerHTML = `$ ${total}`;
  document.querySelector("#totalDelivery").innerHTML = "$ 10";
  document.querySelector("#totalPayment").innerHTML = `$ ${total + 10}`;
};

export let findIndex = (id, list) => {
  return list.findIndex((el) => el.id == id);
};

export let showToastMessage = (msg, isSuccess) => {
  Toastify({
    text: msg,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    style: {
      background: `linear-gradient(to right, ${
        isSuccess ? "#00b09b, #96c93d" : "#C70039, #F94C10"
      } )`,
    },
    onClick: function () {}, // Callback after click
  }).showToast();
};
