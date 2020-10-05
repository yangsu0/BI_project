const API_URL = "http://localhost:8080/";

function saveToken(data, status) {
  if (status == "success") {
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("user", JSON.stringify(data.user));
    window.location.replace("./index.html");
  } else {
    alert("Error: Failed to register please try again");
  }
}

function register() {
    $.post(API_URL + "api/auth/register/user",
    {
      pseudo: $('#username').val(),
      password: $('#pw').val()
    }, saveToken);
}

function login() {
  $.post(API_URL + "api/auth/login/user",
    {
      pseudo: $('#userid').val(),
      password: $('#pw').val()
    }, saveToken );
}

function logout() {
  window.sessionStorage.removeItem("token");
  window.sessionStorage.removeItem("user");
  window.location.replace("./index.html");
}