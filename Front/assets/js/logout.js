if (window.sessionStorage.getItem("token") != null) {
    $(".right").html('<a id="logout-btn" href="#" class="button alt" onclick="logout()">Logout</a>');
    $(".links").append('<p class="nav_user"><u>Connected as ' + JSON.parse(window.sessionStorage.getItem("user")).pseudo + '</u></p>')
}
