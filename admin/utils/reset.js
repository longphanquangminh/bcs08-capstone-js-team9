function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("screen").value = "";
  document.getElementById("backCamera").value = "";
  document.getElementById("frontCamera").value = "";
  document.getElementById("photo").value = "";
  document.getElementById("description").value = "";
  document.getElementById("type").value = NOT_SELECTED_YET;

  document.getElementById("name-error").innerHTML = "";
  document.getElementById("price-error").innerHTML = "";
  document.getElementById("screen-error").innerHTML = "";
  document.getElementById("backCamera-error").innerHTML = "";
  document.getElementById("frontCamera-error").innerHTML = "";
  document.getElementById("photo-error").innerHTML = "";
  document.getElementById("description-error").innerHTML = "";
  document.getElementById("type-error").innerHTML = "";
}

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
