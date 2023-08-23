const BASE_URL = "https://64e1b8e7ab00373588185a1c.mockapi.io/api/v1/products";

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
    let { name, price, img, desc, type, screen, backCamera, frontCamera } = el;
    let contentDiv = /*html*/ `
        
        <div class="product-item">
            <img
              src=${img}
              alt=""
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
              <button class="button">Thêm vào giỏ hàng</button>
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
