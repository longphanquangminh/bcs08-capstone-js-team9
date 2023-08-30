function checkLength(idErr, value, min, max) {
  if (value.trim().length == 0) {
    document.getElementById(idErr).innerText = "This input can not be empty!";
    return false;
  }
  if (value.trim().length < min || value.trim().length > max) {
    document.getElementById(idErr).innerText = `This input must have ${min} to ${max} characters`;
    return false;
  }
  document.getElementById(idErr).innerText = "";
  return true;
}

function checkImageUri(idErr, value) {
  if (validator.isURL(value)) {
    document.getElementById(idErr).innerText = "";
    return true;
  }
  document.getElementById(idErr).innerText = "Invalid image link!";
  return false;
}

function checkChosenType(idErr, value) {
  if (value == NOT_SELECTED_YET) {
    document.getElementById(idErr).innerText = "Please select type!";
    return false;
  }

  document.getElementById(idErr).innerText = "";
  return true;
}

function checkPrice(idErr, value) {
  if (value <= 0) {
    document.getElementById(idErr).innerText = "Price must be more than 0!";
    return false;
  }
  document.getElementById(idErr).innerText = "";
  return true;
}
