function fetchProductList() {
  startLoading();
  axios({
    url: BASE_URL,
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
