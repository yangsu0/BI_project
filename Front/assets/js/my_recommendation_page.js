select_wine = "";

function str_wine_flavors(flavors) {
    if (flavors != undefined) {
        return flavors.join(', ');
    }
    return ' ';
}

function on_success_popular_wine(data) {
    i = 1
    data.data.forEach(wine => {
        $("#list-tab").append('<a class="list-group-item list-group-item-action list-group-item-light" id="list-' + i + '-list" data-toggle="list" href="#list-' + i + '\
        "role="tab"  aria-controls="' + i + '"><u>Top ' + i + '</u>: ' + wine.title + '</a>')
        $("#nav-tabContent").append('<div class="tab-pane fade" id="list-' + i + '" role="tabpanel" aria-labelledby="list-' + i + '-list">\
        <p class="features">name: </p> <strong>' + wine.title + '</strong> \
        <br> <p class="features">province: </p><strong>' +  wine.province + '</strong> \
        <br> <p class="features"> price: </p><strong>' + wine.price + '</strong>\
        <br> <p class="features">variety: </p><strong>' + wine.variety + '</strong>\
        <br> <p class="features">flavors: </p><strong>' + str_wine_flavors(wine.flavors[0].flavors) + '</strong>\
        </div>')
        i++;
    });
}

function add_liked_wine_success(data) {
    call_snackbar("You're wine have been added to your favorite list of wines", "success")
}

function add_liked_wine_error(err) {
    if (err) {
        call_snackbar(err.responseJSON.message, "error");
    }
}

function add_liked_wine() {
    if (select_wine != "") {
        post_liked_wine(select_wine, add_liked_wine_success, add_liked_wine_error);
        select_wine = "";
    }
    else {
        call_snackbar("We are sorry we have not found your wine", "error");
    }
}

function on_success_get_cb_wine(data) {
    i = 1
    data.data.recommendationWineCB.forEach(wine => {
        $("#top_rs").append('<li><a style="color: black" data-toggle="collapse" href="#top' + i + '" role="button" aria-expanded="false" aria-controls="top' + i +'">\
        <h5>' +  wine.wine.title +'</h5></a>\
        <div class="collapse" id="top' + i +'">\
             <div class="card card-body">\
                <p><b>vintage</b>: ' + wine.wine.vintage + '</p>\
                <p><b>variety</b>: ' + wine.wine.variety + '</p>\
                <p><b>flavors</b>: ' + str_wine_flavors(wine.wine.flavors[0].flavors) + '</p>\
                <p><b>price</b>: ' + wine.wine.price + '</p>\
                <p><b>score</b>: ' + Math.trunc(wine.score * 100) + '</p>\
              </div>\
        </div>\
        </li>');
        i += 1;
    });
}

function on_sucess_get_kb_wine(data) {
    i = 1;

    $("#kb_spinner").prop("hidden", true);
    data.data.forEach(wine => {
        $("#top_rs").append('<li><a style="color: black" data-toggle="collapse" href="#top' + i + '_data" role="button" aria-expanded="false" aria-controls="top' + i +'_data">\
        <h5>' +  wine.title +'</h5></a>\
        <div class="collapse" id="top' + i +'_data">\
             <div class="card card-body">\
                <p><b>vintage</b>: ' + wine.vintage + '</p>\
                <p><b>variety</b>: ' + wine.variety + '</p>\
                <p><b>flavors</b>: ' + str_wine_flavors(wine.flavors[0].flavors) + '</p>\
                <p><b>price</b>: ' + wine.price + '</p>\
              </div>\
        </div>\
    </li>');
    i += 1;
    });
}

get_most_popular_wine(on_success_popular_wine);
get_wine_cb_recommendation(on_success_get_cb_wine);
get_wine_kb_recommendation(on_sucess_get_kb_wine);

$('input[name="wine_1"]').autoComplete({
    minChars: 4,
    source: function(term, response) {
        get_wine_with_title(term, response);
    },
  
    onSelect: function(e, term, item) {      
        select_wine = item[0].id;
    },

    renderItem: function (item, search) {
        search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
        return '<div id=' + item._id + ' class="autocomplete-suggestion" data-val="' + item.title + '">' + item.title.replace(re, "<b>$1</b>") + '</div>';
    }
});