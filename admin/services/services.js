const BASE_URL = "https://64e1b8e7ab00373588185a1c.mockapi.io/api/v1/products";

document.body.removeAttribute("style");

function startLoading() {
  document.getElementById("spinner").style.display = "flex";
  document.body.style.overflow = "hidden";
}

function endLoading() {
  document.getElementById("spinner").style.display = "none";
  document.body.style.overflow = "auto";
}

function deleteProductById(id) {
  startLoading();
  axios({
    url: `${BASE_URL}/${id}`,
    method: "DELETE",
  })
    .then(res => {
      fetchProductList();
      console.log(res);
    })
    .catch(err => {
      console.log(err);
      endLoading();
    });
}

function deleteProduct(id) {
  document.getElementById("deleteProductBtn").onclick = () => {
    deleteProductById(id);
  };
}

function renderProductList(list) {
  let contentHTML = "";
  list.reverse().forEach((product, index) => {
    let { id, name, price, image, desc, type } = product;
    let itemString =
      /*html*/
      `
      <div class="flex flex-row p-3 gap-3">
        <div class="basis-1/6">${index + 1}</div>
        <div class="basis-1/6 font-bold">${name}</div>
        <div class="basis-1/6">${price}</div>
        <div class="basis-1/6"><img class="w-full object-cover" src="${image}" alt="${name}" /></div>
        <div class="basis-1/6 text-justify">${desc}</div>
        <div class="basis-1/6">
            <div class="grid lg:flex flex-row gap-3">
                <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" type="button" onclick="editProduct(${id})" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                Edit
                </button>
                <button data-modal-target="popup-modal" data-modal-toggle="popup-modal" type="button" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onclick="deleteProduct(${id})">
                    Delete
                </button>
            </div>
        </div>
      </div>
      <div class="w-full h-0.5 bg-gray-500"></div>
  `;
    contentHTML += itemString;
  });
  document.getElementById("adminProductList").innerHTML = contentHTML;
}

function editProduct(id) {}

function updateProduct(id) {
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let image = document.getElementById("image").value;
  let desc = document.getElementById("desc").value;
  let type = document.getElementById("type").value;
  let product = new Product(name, price, image, desc, type);
  startLoading();
  axios({
    url: `${BASE_URL}/${id}`,
    method: "PUT",
    data: product,
  })
    .then(res => {
      fetchProductList();
      endLoading();
      console.log(res);
    })
    .catch(err => {
      console.log(err);
      endLoading();
    });
}

function fetchProductList() {
  startLoading();
  axios({
    url: BASE_URL,
    method: "GET",
  })
    .then(res => {
      renderProductList(res.data);
      console.log(res);
      endLoading();
    })
    .catch(err => {
      console.log(err);
      endLoading();
    });
}

fetchProductList();
