function update_preference(preference) {
    preference = preference.data.preference;
    
    if (preference == undefined) {
        $("#pref").prop("hidden", true);
        return;
    }

    if (preference.flavors != undefined) {
        preference.flavors.forEach(flavor => {
            $("#flavors").append('<p class="flex-p">' + flavor + '</p>');
        });
    }

    if (preference.fruits != undefined) {
        preference.fruits.forEach(fruit => {
            $("#fruits").append('<p class="flex-p">' + fruit + '</p>');
        });
    }

    if (preference.priceRange != undefined) {
        $("#price").html(preference.priceRange + ' ￦');
    }
}

function update_wine_list(data) {
    
    data.data.wineLiked.forEach(wine => {
        $("#row").append('<div class="col-xs-8 col-md-4">' + 
        '<div class="card h-100">' +
                '<div class="card-body">' +
                    '<h5 class="card-title">' + wine.title + '</h5>' +
                    '<button data-toggle="modal" class="btn btn-info"\
                     onclick="unliked_wine(\'' + wine._id + '\')">Don\'t like anymore</button>' +
                '</div>' +
                '<div class="card-footer">' +
                    '<small class="text-muted">' + wine.description + '</small>' +
                '</div>' +
            '</div>' +
        '</div>');
    });

    data.data.wineLikedR.forEach(wine => {
        $("#top_rs").append('<div class="col-sm-8 col-lg-16">' + 
        '<div class="card h-100">' +
                '<div class="card-body">' +
                    '<h5 class="card-title">' + wine.title + '</h5>' +
                    '<button data-toggle="modal" class="btn btn-info"\
                     onclick="unliked_wine(\'' + wine._id + '\')">Don\'t like anymore</button>' +
                '</div>' +
                '<div class="card-footer">' +
                    '<small class="text-muted">' + wine.description + '</small>' +
                '</div>' +
            '</div>' +
        '</div>');
    })
}

get_user_wine(update_wine_list);
get_user_preference(update_preference);
