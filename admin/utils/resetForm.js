function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("screen").value = "";
  document.getElementById("backCamera").value = "";
  document.getElementById("frontCamera").value = "";
  document.getElementById("photo").value = "";
  document.getElementById("description").value = "";
  document.getElementById("type").value = NOT_SELECTED_YET;

  document.getElementById("nameUpdate").value = "";
  document.getElementById("priceUpdate").value = "";
  document.getElementById("screenUpdate").value = "";
  document.getElementById("backCameraUpdate").value = "";
  document.getElementById("frontCameraUpdate").value = "";
  document.getElementById("photoUpdate").value = "";
  document.getElementById("descriptionUpdate").value = "";
  document.getElementById("typeUpdate").value = NOT_SELECTED_YET;

  document.getElementById("namePreview").innerHTML = "";
  document.getElementById("pricePreview").innerHTML = "";
  document.getElementById("screenPreview").innerHTML = "";
  document.getElementById("backCameraPreview").innerHTML = "";
  document.getElementById("frontCameraPreview").innerHTML = "";
  document.getElementById("photoPreview").innerHTML = "";
  document.getElementById("descriptionPreview").innerHTML = "";
  document.getElementById("typePreview").innerHTML = "";

  document.getElementById("name-error").innerHTML = "";
  document.getElementById("price-error").innerHTML = "";
  document.getElementById("screen-error").innerHTML = "";
  document.getElementById("backCamera-error").innerHTML = "";
  document.getElementById("frontCamera-error").innerHTML = "";
  document.getElementById("photo-error").innerHTML = "";
  document.getElementById("description-error").innerHTML = "";
  document.getElementById("type-error").innerHTML = "";

  document.getElementById("nameUpdate-error").innerHTML = "";
  document.getElementById("priceUpdate-error").innerHTML = "";
  document.getElementById("screenUpdate-error").innerHTML = "";
  document.getElementById("backCameraUpdate-error").innerHTML = "";
  document.getElementById("frontCameraUpdate-error").innerHTML = "";
  document.getElementById("photoUpdate-error").innerHTML = "";
  document.getElementById("descriptionUpdate-error").innerHTML = "";
  document.getElementById("typeUpdate-error").innerHTML = "";
}
