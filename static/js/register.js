var pass = document.getElementById("pass");
var confirm = document.getElementById("confirm");
var div = document.getElementById("register_div");
var err = document.createElement("div");
err.setAttribute("class", "alert alert-danger")
err.innerHTML = "Passwords do not match";

var confirmPassword = function(e) {

  var password = pass.value;
  var confirm_password = confirm.value;
  var button = document.getElementById("register");

  if(password === confirm_password ) {
    button.removeAttribute("disabled");
    err.remove();
  }
  else {
    div.appendChild(err);
    button.setAttribute("disabled" , "disabled");
  }
};

pass.addEventListener('input', confirmPassword);
confirm.addEventListener('input', confirmPassword);
