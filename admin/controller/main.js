let chosenProductId = -1;

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
  if (validateProductCreate(product)) {
    startLoading();
    axios({
      url: BASE_URL,
      method: "POST",
      data: product,
    })
      .then(res => {
        fetchProductList();
        createProductModalHide();
        setTimeout(() => {
          endLoading();
        }, TIME_OUT_VALUE);
        console.log(res);
        resetForm();
      })
      .catch(err => {
        console.log(err);
        createProductModalHide();
        setTimeout(() => {
          endLoading();
        }, TIME_OUT_VALUE);
        resetForm();
      });
  }
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
  if (validateProductUpdate(product)) {
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
        }, TIME_OUT_VALUE);
        console.log(res);
        updateProductModalHide();
      })
      .catch(err => {
        console.log(err);
        setTimeout(() => {
          endLoading();
        }, TIME_OUT_VALUE);
        updateProductModalHide();
      });
  }
}

function deleteProduct() {
  startLoading();
  document.getElementById("simple-search").value = "";
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
      }, TIME_OUT_VALUE);
    });
}

function getProductId(id) {
  chosenProductId = id;
  deleteProductModalShow();
}

function readProduct(id) {
  readProductModalShow();
  resetForm();
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
      }, TIME_OUT_VALUE);
    })
    .catch(err => {
      console.log(err);
      resetForm();
      setTimeout(() => {
        endLoading();
      }, TIME_OUT_VALUE);
    });
}

function setDefaultSort() {
  startLoading();
  axios({
    url: BASE_URL,
    method: "GET",
  })
    .then(res => {
      renderProductList(res.data);
      endLoading();
    })
    .catch(err => {
      console.log(err);
      endLoading();
    });
}

function sortLowToHigh() {
  startLoading();
  axios({
    url: BASE_URL,
    method: "GET",
  })
    .then(res => {
      renderProductList(res.data.sort((a, b) => b.price - a.price));
      endLoading();
    })
    .catch(err => {
      console.log(err);
      endLoading();
    });
}

function sortHighToLow() {
  startLoading();
  axios({
    url: BASE_URL,
    method: "GET",
  })
    .then(res => {
      renderProductList(res.data.sort((a, b) => a.price - b.price));
      endLoading();
    })
    .catch(err => {
      console.log(err);
      endLoading();
    });
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
      }, TIME_OUT_VALUE);
    })
    .catch(err => {
      console.log(err);
      setTimeout(() => {
        endLoading();
      }, TIME_OUT_VALUE);
    });
}

function searchProduct() {
  let searchValue = convertVietnameseToEnglish(removeExtraSpaces(document.getElementById("simple-search").value.trim().toLowerCase()));
  if (searchValue.trim() == "") {
    fetchProductList();
    return;
  }
  startLoading();
  axios({
    url: `${BASE_URL}?name=${searchValue}`,
    method: "GET",
  })
    .then(res => {
      renderProductList(res.data);
      setTimeout(() => {
        endLoading();
      }, TIME_OUT_VALUE);
    })
    .catch(err => {
      console.log(err);
      setTimeout(() => {
        endLoading();
      }, TIME_OUT_VALUE);
    });
}

fetchProductList();

applyNumberInputStyles();
