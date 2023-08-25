const BASE_URL = "https://64e1b8e7ab00373588185a1c.mockapi.io/api/v1/products";

const timeOutValue = 1000;

let chosenProductId = -1;

const createProductModalEl = document.getElementById("createProductModal");
const createProductModal = new Modal(createProductModalEl);
const updateProductModalEl = document.getElementById("updateProductModal");
const updateProductModal = new Modal(updateProductModalEl);
const readProductModalEl = document.getElementById("readProductModal");
const readProductModal = new Modal(readProductModalEl);
const deleteProductModalEl = document.getElementById("deleteModal");
const deleteProductModal = new Modal(deleteProductModalEl);

function startLoading() {
  document.getElementById("spinner").style.display = "flex";
  document.body.style.overflow = "hidden";
}

function endLoading() {
  document.getElementById("spinner").style.display = "none";
  document.body.style.overflow = "auto";
  document.body.removeAttribute("style");
}

function deleteProduct() {
  startLoading();
  deleteProductModalHide();
  axios({
    url: `${BASE_URL}/${chosenProductId}`,
    method: "DELETE",
  })
    .then(res => {
      fetchProductList();
      console.log(res);
    })
    .catch(err => {
      console.log(err);
      setTimeout(() => {
        endLoading();
      }, timeOutValue);
    });
}

function createProductModalShow() {
  createProductModal.show();
  document.body.style.overflow = "hidden";
}

function createProductModalHide() {
  createProductModal.hide();
  // document.body.style.overflow = "auto";
}

function updateProductModalShow() {
  updateProductModal.show();
  // document.body.style.overflow = "hidden";
}

function updateProductModalHide() {
  updateProductModal.hide();
  // document.body.style.overflow = "auto";
}

function readProductModalShow() {
  readProductModal.show();
  // document.body.style.overflow = "hidden";
}

function readProductModalHide() {
  readProductModal.hide();
  // document.body.style.overflow = "auto";
}

function deleteProductModalShow() {
  deleteProductModal.show();
  // document.body.style.overflow = "hidden";
}

function deleteProductModalHide() {
  deleteProductModal.hide();
  // document.body.style.overflow = "auto";
}

function getProductId(id) {
  chosenProductId = id;
  console.log(id);
  deleteProductModalShow();
}

function readProduct(id) {
  readProductModalShow();
  console.log(id);
  resetPreview();
  startLoading();
  axios({
    url: `${BASE_URL}/${id}`,
    method: "GET",
  })
    .then(res => {
      document.getElementById("namePreview").innerHTML = res.data.name;
      document.getElementById("pricePreview").innerHTML = new Intl.NumberFormat().format((res.data.price * 1).toFixed(2));
      document.getElementById("screenPreview").innerHTML = res.data.screen;
      document.getElementById("backCameraPreview").innerHTML = res.data.backCamera;
      document.getElementById("frontCameraPreview").innerHTML = res.data.frontCamera;
      document.getElementById("photoPreview").innerHTML = `<img class="w-[25%] m-auto" src="${res.data.img}" alt="${id}" />`;
      document.getElementById("descriptionPreview").innerHTML = res.data.desc;
      document.getElementById("typePreview").innerHTML = res.data.type;
      setTimeout(() => {
        endLoading();
      }, timeOutValue);
    })
    .catch(err => {
      console.log(err);
      resetPreview();
      setTimeout(() => {
        endLoading();
      }, timeOutValue);
    });
}

function renderProductList(list) {
  let contentHTML = "";
  list.reverse().forEach((product, index) => {
    let { id, name, price, img, desc, type } = product;
    let itemString =
      /*html*/
      `
    <tr class="border-b dark:border-gray-700">
    <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">${index + 1}</th>
    <td class="px-4 py-3">${name}</td>
    <td class="px-4 py-3">$${new Intl.NumberFormat().format((price * 1).toFixed(2))}</td>
    <td class="px-4 py-3 max-w-[12rem]"><img class="w-full m-auto" src="${img}" alt="${id}" /></td>
    <td class="px-4 py-3 max-w-[12rem] truncate">${desc}</td>
    <td class="px-4 py-3 items-center justify-end">
    <div
    class="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
  >
    <ul class="py-1 text-sm">
      <li>
        <button
          type="button"
          data-modal-target="updateProductModal"
          data-modal-toggle="updateProductModal"
          class="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200"
          onclick="editProduct(${id})"
        >
          <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/timeOutValue/svg" viewbox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
            />
          </svg>
          Edit
        </button>
      </li>
      <li>
        <button
          type="button"
          data-modal-target="readProductModal"
          data-modal-toggle="readProductModal"
          class="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200"
          onclick="readProduct(${id})"
        >
          <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/timeOutValue/svg" viewbox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          Preview
        </button>
      </li>
      <li>
        <button
          type="button"
          data-modal-target="deleteModal"
          data-modal-toggle="deleteModal"
          class="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400"
          onclick="getProductId(${id})"
        >
          <svg class="w-4 h-4 mr-2" viewbox="0 0 14 15" fill="none" xmlns="http://www.w3.org/timeOutValue/svg" aria-hidden="true">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              fill="currentColor"
              d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922ZM4.29922 5.70078C4.29922 5.46209 4.39404 5.23317 4.56282 5.06439C4.73161 4.8956 4.96052 4.80078 5.19922 4.80078C5.43791 4.80078 5.66683 4.8956 5.83561 5.06439C6.0044 5.23317 6.09922 5.46209 6.09922 5.70078V11.1008C6.09922 11.3395 6.0044 11.5684 5.83561 11.7372C5.66683 11.906 5.43791 12.0008 5.19922 12.0008C4.96052 12.0008 4.73161 11.906 4.56282 11.7372C4.39404 11.5684 4.29922 11.3395 4.29922 11.1008V5.70078ZM8.79922 4.80078C8.56052 4.80078 8.33161 4.8956 8.16282 5.06439C7.99404 5.23317 7.89922 5.46209 7.89922 5.70078V11.1008C7.89922 11.3395 7.99404 11.5684 8.16282 11.7372C8.33161 11.906 8.56052 12.0008 8.79922 12.0008C9.03791 12.0008 9.26683 11.906 9.43561 11.7372C9.6044 11.5684 9.69922 11.3395 9.69922 11.1008V5.70078C9.69922 5.46209 9.6044 5.23317 9.43561 5.06439C9.26683 4.8956 9.03791 4.80078 8.79922 4.80078Z"
            />
          </svg>
          Delete
        </button>
      </li>
    </ul>
  </div>
    </td>
  </tr>
    `;
    contentHTML += itemString;
  });
  document.getElementById("adminProductList").innerHTML = contentHTML;
}

function editProduct(id) {
  updateProductModalShow();
  chosenProductId = id;
  startLoading();
  axios({
    url: `${BASE_URL}/${id}`,
    method: "GET",
  })
    .then(res => {
      document.getElementById("nameUpdate").value = res.data.name;
      document.getElementById("priceUpdate").value = res.data.price;
      document.getElementById("screenUpdate").value = res.data.screen;
      document.getElementById("photoUpdate").value = res.data.img;
      document.getElementById("backCameraUpdate").value = res.data.backCamera;
      document.getElementById("frontCameraUpdate").value = res.data.frontCamera;
      document.getElementById("descriptionUpdate").value = res.data.desc;
      document.getElementById("typeUpdate").value = res.data.type;
      setTimeout(() => {
        endLoading();
      }, timeOutValue);
    })
    .catch(err => {
      console.log(err);
      setTimeout(() => {
        endLoading();
      }, timeOutValue);
    });
}

function addProduct() {
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value * 1;
  let screen = document.getElementById("screen").value;
  let img = document.getElementById("photo").value;
  let backCamera = document.getElementById("backCamera").value;
  let frontCamera = document.getElementById("frontCamera").value;
  let desc = document.getElementById("description").value;
  let type = document.getElementById("type").value;
  let product = new Product(name, price, screen, backCamera, frontCamera, img, desc, type);
  startLoading();
  axios({
    url: BASE_URL,
    method: "POST",
    data: product,
  })
    .then(res => {
      fetchProductList();
      setTimeout(() => {
        endLoading();
      }, timeOutValue);
      console.log(res);
    })
    .catch(err => {
      console.log(err);
      setTimeout(() => {
        endLoading();
      }, timeOutValue);
    });
}

function updateProduct() {
  let name = document.getElementById("nameUpdate").value;
  let price = document.getElementById("priceUpdate").value * 1;
  let screen = document.getElementById("screenUpdate").value;
  let img = document.getElementById("photoUpdate").value;
  let backCamera = document.getElementById("backCameraUpdate").value;
  let frontCamera = document.getElementById("frontCameraUpdate").value;
  let desc = document.getElementById("descriptionUpdate").value;
  let type = document.getElementById("typeUpdate").value;
  let product = new Product(name, price, screen, backCamera, frontCamera, img, desc, type);
  startLoading();
  axios({
    url: `${BASE_URL}/${chosenProductId}`,
    method: "PUT",
    data: product,
  })
    .then(res => {
      fetchProductList();
      setTimeout(() => {
        endLoading();
      }, timeOutValue);
      console.log(res);
      updateProductModalHide();
    })
    .catch(err => {
      console.log(err);
      setTimeout(() => {
        endLoading();
      }, timeOutValue);
      updateProductModalHide();
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
      setTimeout(() => {
        endLoading();
      }, timeOutValue);
    })
    .catch(err => {
      console.log(err);
      setTimeout(() => {
        endLoading();
      }, timeOutValue);
    });
}

fetchProductList();

function resetPreview() {
  document.getElementById("namePreview").innerHTML = "";
  document.getElementById("pricePreview").innerHTML = "";
  document.getElementById("screenPreview").innerHTML = "";
  document.getElementById("backCameraPreview").innerHTML = "";
  document.getElementById("frontCameraPreview").innerHTML = "";
  document.getElementById("photoPreview").innerHTML = "";
  document.getElementById("descriptionPreview").innerHTML = "";
  document.getElementById("typePreview").innerHTML = "";
}
