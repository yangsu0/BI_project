i = 0

if (window.sessionStorage.getItem("token") == null) {
    $(".links").each(function() {
        $(this).find('li').each(function () {
            var a = $(this).find("a");
            if (a[i].href.includes("authorized.html")) {
                $(this).css({visibility:  "hidden"})
            }
            if (a[i].href.includes("generic.html")) {
                $(this).css({visibility:  "hidden"})
            }
            if (a[i].href.includes("elements.html")) {
                $(this).css({visibility:  "hidden"})
            }
        });
    });
}
else {
    if (JSON.parse(window.sessionStorage.getItem("user")).has_preference == undefined || 
    JSON.parse(window.sessionStorage.getItem("user")).has_preference == false) {
        $(".right").html(' <img src="images/wine_popup.jpg" data-toggle="modal" data-target="#ModalCenter" class="image blinking" style="cursor:pointer; cursor:hand;width: 120%;height: auto; position: absolute; right: 150px; top: 12px;" onmousedown="startDrag(event, this)">\
        <a id="logout-btn" href="#" class="button alt" onclick="logout()">Logout</a>');
    }
    else {
        $(".right").html('<a id="logout-btn" href="#" class="button alt" onclick="logout()">Logout</a>');
    }

    $(".links").append('<p class="nav_user"><u>Connected as ' + JSON.parse(window.sessionStorage.getItem("user")).pseudo + '</u></p>')
}
