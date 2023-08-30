let chosenProductId = -1;

function addProduct() {
  let product = getProductInfoFromInput();
  if (validateProductInput(product)) {
    startLoading();
    axios({
      url: BASE_URL,
      method: "POST",
      data: product,
    })
      .then(res => {
        fetchProductList();
        createAndUpdateProductModalHide();
        setTimeout(() => {
          endLoading();
        }, TIME_OUT_VALUE);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        createAndUpdateProductModalHide();
        setTimeout(() => {
          endLoading();
        }, TIME_OUT_VALUE);
      });
  }
}

function updateProduct() {
  let product = getProductInfoFromInput();
  if (validateProductInput(product)) {
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
        createAndUpdateProductModalHide();
      })
      .catch(err => {
        console.log(err);
        setTimeout(() => {
          endLoading();
        }, TIME_OUT_VALUE);
        createAndUpdateProductModalHide();
      });
  }
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
      }, TIME_OUT_VALUE);
    });
}

function getProductId(id) {
  chosenProductId = id;
  deleteProductModalShow();
}

function readProduct(id) {
  readProductModalShow();
  resetPreview();
  startLoading();
  axios({
    url: `${BASE_URL}/${id}`,
    method: "GET",
  })
    .then(res => {
      showProductDetailOnPreviewModal(res.data);
      setTimeout(() => {
        endLoading();
      }, TIME_OUT_VALUE);
    })
    .catch(err => {
      console.log(err);
      resetPreview();
      setTimeout(() => {
        endLoading();
      }, TIME_OUT_VALUE);
    });
}

function setDefaultSort() {
  document.getElementById("defaultSort").style.fontWeight = "bold";
  document.getElementById("lowToHighSort").style.fontWeight = "normal";
  document.getElementById("highToLowSort").style.fontWeight = "normal";
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
  document.getElementById("defaultSort").style.fontWeight = "normal";
  document.getElementById("lowToHighSort").style.fontWeight = "bold";
  document.getElementById("highToLowSort").style.fontWeight = "normal";
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
  document.getElementById("defaultSort").style.fontWeight = "normal";
  document.getElementById("lowToHighSort").style.fontWeight = "normal";
  document.getElementById("highToLowSort").style.fontWeight = "bold";
  axios({
    url: BASE_URL,
    method: "GET",
  })
    .then(res => {
      renderProductList(res.data.sort((a, b) => b.price - a.price).reverse());
      endLoading();
    })
    .catch(err => {
      console.log(err);
      endLoading();
    });
}

function editProduct(id) {
  createAndUpdateProductModalShow();
  document.getElementById("updateProductBtnSection").style.display = "flex";
  document.getElementById("addProductBtnSection").style.display = "none";
  document.getElementById("modal-title").innerText = "Update Product";
  chosenProductId = id;
  startLoading();
  axios({
    url: `${BASE_URL}/${id}`,
    method: "GET",
  })
    .then(res => {
      showProductDetailOnFormModal(res.data);
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

document.getElementById("mobile-menu").classList.toggle("hidden");
document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("mobile-menu").classList.toggle("hidden");
});
