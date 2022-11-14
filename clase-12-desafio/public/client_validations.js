
function validateForm() {
    let title = document.forms["product_form"]["title"].value;
    if (!title) {
      alert("Ingrese el nombre del producto");
      return false;
    }

    let price = document.forms["product_form"]["price"].value;
    if (!price) {
      alert("Ingrese el precio del producto");
      return false;
    }

    let thumbnail = document.forms["product_form"]["thumbnail"].value;
    if (!thumbnail) {
      alert("Ingrese la url de la foto del producto");
      return false;
    }
    
    return true;
  }
  
function validateMessageForm() {
    let email = document.forms["message_form"]["email"].value;
    if (!email) {
      alert("Ingrese su email");
      return false;
    }

    let message = document.forms["message_form"]["message"].value;
    if (!message) {
      alert("Ingrese su mensaje");
      return false;
    }
    
    return true;
  }