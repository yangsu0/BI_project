$.ajaxSetup({
  headers: {
    'x-access-token': window.sessionStorage.getItem('token'),
    'Content-Type':'application/json'
  },
});

function onError(err) {
  console.log(onError)
}

function unliked_wine(wine_id) {
  $.ajax({
    url: API_URL + "api/user/wine/liked",
    type: 'delete',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({data: { _id: wine_id }}),
    success: function(data) {
      location.reload();
    },
  });
}

function get_most_popular_wine(onSucess) {
  $.get({
    url: API_URL + "api/wine/popular",
    success: onSucess,
    error: onError
  });
}

function post_liked_wine(wine_id, onSucess, customOnError) {
  $.ajax({
    url: API_URL + "api/user/wine/liked",
    type: 'post',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({data: { id: wine_id }}),
    success: onSucess,
    error: customOnError
  });
}

function update_user_preference(user_preference, on_success) {
  $.ajax({
    url: API_URL + "api/user/preference",
    type: 'post',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
        $('#target').html(data.msg);
        on_sucess();
    },
    data: JSON.stringify(user_preference)
  });
}

function get_user_wine(onSucess) {
  $.get({
    url : API_URL + "api/user/wine/liked",
    success: onSucess,
    error: onError
  })
}

function get_user_preference(onSucess) {
  $.get({
    url : API_URL + "api/user/preference",
    success: onSucess,
    error: onError
  })
}

function get_wine_with_title(title, select_response) {
  $.get({
    url: API_URL + "api/wine/?title=" + title,
    headers: {
      'x-access-token': window.sessionStorage.getItem('token'),
      'Content-Type':'application/json'
    },
    success: function(response) {
      select_response(response.data);
    },
    error: function(xhr) {
    }
  });
}

function get_wine_cb_recommendation(onSucess) {
  $.get({
    url: API_URL + "api/user/recommendation/cb",
    success: onSucess
  });
}

function get_wine_kb_recommendation(onSucess) {
  $.get({
    url: API_URL + "api/user/recommendation/kb",
    success: onSucess
  });
}