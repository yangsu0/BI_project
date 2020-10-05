selected_wine_list = [];

function on_sucess() {
    setTimeout(function () {
        location.replace("authorized.html");
    }, 3000);
}
function secondPart()
{
    var ques4 = new Array();
    var ques5 = new Array();
    var ques6 = '';
    
    $("#ques_4").show();
    $("#next_quest").click(() => {
        console.log("test");
        $("input[name=wine_body]:checked").each(function () {
            ques4.push($(this).val());
        });
        $("#ques_4").hide();
        $("#ques_5").show();
        $("#next_quest").click(() => {
            $("input[name=aroma]:checked").each(function () {
                ques5.push($(this).val());
            });
            $("#ques_5").hide();
            $("#next_quest").text("Submit");
            $("#ques_6").show();
            $("#next_quest").click(() => {
                user_preference = {}
                flavors_ids = ["sweet", "dry", "tannin", "acidity", "fruity", "earthy", "spicy", "smoky", "flowery", "herb"];
                fruity_ids = ["lemon", "lime", "berry", "pineapple", "apple", "cherry", "strawberry", "apricot", "grapefruit"];

                user_preference['flavors'] = [];
                user_preference['fruits'] = [];

                flavors_ids.forEach(flavor => {
                    if ($("#" + flavor).attr("check") == "true")
                        user_preference['flavors'].push(flavor);
                });

                fruity_ids.forEach(fruit => {
                    if ($("#" + fruit).attr("check") == "true")
                        user_preference['fruits'].push(fruit);
                });

                user_preference['priceRange'] = ques6 = $("#price").text();
                user_preference['priceRange'] = user_preference['priceRange'].replace('(USD)', '');
                
                update_user_preference(user_preference, on_sucess);
                $("#message_end_quest").html("Thank you, yours preference will be taking into account for yours nexts recommendations")
            });
        });
    });
}

$(document).ready(() => {
	current_quest = "#quest_1";
	$("input[id='no']").click(() => {
		if (current_quest == "#quest_1")
			$("#ques_1").show();
		$("#next_quest").click(() => {
			var ques1 = new Array();
			var ques2 = '';
			var ques3 = '';
			var ques3_more = new Array();
			$("input[name=taste1]:checked").each(function () {
				ques1.push($(this).val());
			});
			$("#ques_1").hide();
			current_quest = "#quest_2";
			if (current_quest == "#quest_2")
				$("#ques_2").show();
			$("#next_quest").click(() => {
				current_quest = "#quest_3";
				ques2 = $("input[name=acidity]:checked").val();
				$("#ques_2").hide();
				if (current_quest == "#quest_3")
					$("#ques_3").show();
				$("#next_quest").click(() => {
					current_quest = "#quest_4";
					ques3 = $("input[name=fruity]:checked").val();
					$("#ques_3").hide();
					if (ques3 == "fruity" && current_quest == "#quest_4") {
						console.log("test");
							$("#ques_3_more").show();
							$("#next_quest").click(() => {
								$("input[name=fruit]:checked").each(function () {
									ques3_more.push($(this).val());
								});
                                $("#ques_3_more").hide();
                                secondPart();
							});
                    }
                    else
                        secondPart()
				});
			});
		});
	});

	$("#ques_1").hide();
	$("#ques_2").hide();
	$("#ques_3").hide();
	$("#ques_3_more").hide();
	$("#ques_4").hide();
	$("#ques_5").hide();
	$("#ques_6").hide();
});

function change_text_questions(name) {
	$("#next_quest").text(name);
}

$('input[name="wine_1"]').autoComplete({
	minChars: 4,
	source: function (term, response) {
		get_wine_with_title(term, response);
	},

	onSelect: function (e, term, item) {
		$('input[name="wine_1"]').css("background-color", "#43a047");
		$('input[name="wine_1"]').prop('disabled', true);

		$('input[name="wine_2"]').removeClass("disabled")
		$('input[name="wine_2"]').prop('disabled', false);


		$('input[name="wine_1"]').css("color", "white");
		$('div[name="wine_1"]').append("<p> <b>Wine 1 sucessfully selected !</b> </p>")

		selected_wine_list.push(item[0].id);
	},

	renderItem: function (item, search) {
		search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
		var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
		return '<div id=' + item._id + ' class="autocomplete-suggestion" data-val="' + item.title + '">' + item.title.replace(re, "<b>$1</b>") + '</div>';
	}
});


$('input[name="wine_2"]').autoComplete({
	minChars: 4,
	source: function (term, response) {
		get_wine_with_title(term, response);
	},

	onSelect: function (e, term, item) {
		$('input[name="wine_2"]').css("background-color", "#43a047");
		$('input[name="wine_2"]').prop('disabled', true);

		$('input[name="wine_3"]').removeClass("disabled")
		$('input[name="wine_3"]').prop('disabled', false);

		$('input[name="wine_2"]').css("color", "white");
		$('div[name="wine_2"]').append("<p> <b>Wine 2 sucessfully selected !</b> </p>")

		selected_wine_list.push(item[0].id);
	},

	renderItem: function (item, search) {
		if (selected_wine_list.includes(item._id))
			return '';
		search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
		var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
		return '<div id=' + item._id + ' class="autocomplete-suggestion" data-val="' + item.title + '">' + item.title.replace(re, "<b>$1</b>") + '</div>';
	}
});

$('input[name="wine_3"]').autoComplete({
	minChars: 4,
	source: function (term, response) {
		get_wine_with_title(term, response);
	},

	onSelect: function (e, term, item) {

		$('input[name="wine_3"]').css("background-color", "#43a047");

		$('input[name="wine_3"]').removeClass("disabled")
		$('input[name="wine_3"]').prop('disabled', true);

		$('input[name="wine_3"]').css("color", "white");
		$('div[name="wine_3"]').append("<p> <b>Wine 3 sucessfully selected !</b> </p>")

		selected_wine_list.push(item[0].id);
	},

	renderItem: function (item, search) {
		if (selected_wine_list.includes(item._id))
			return '';
		search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
		var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
		return '<div id=' + item._id + ' class="autocomplete-suggestion" data-val="' + item.title + '">' + item.title.replace(re, "<b>$1</b>") + '</div>';
	}
});

$("input[type='checkbox']").click(function () {
	if ($(this).attr("check") == undefined || $(this).attr("check") == "false") {
		$(this).attr("check", "true")
	} else if ($(this).attr("check") == "true") {
		$(this).attr("check", "false");
	}
});

$("#next_quest").click(() => {
	if ($("#next_quest").html() == "Finish" && selected_wine_list.length == 3) {
		selected_wine_list.forEach(id => {
			post_liked_wine(id, function (data) {
				ss = JSON.parse(window.sessionStorage.getItem("user"));
				if (ss == undefined)
					ss = {
						user: {
							has_preference: true
						}
					}
				else
					ss.has_preference = true;
				window.sessionStorage.setItem("user", JSON.stringify(ss));
				$("#message_end_quest").html("Thank you now your wines will be taking into accounts for yours nexts recommendations")
				setTimeout(function () {
					location.replace("authorized.html");
				}, 3000);
			}, function (err) {
				call_snackbar("An error occured please refresh the page and try to liked other wines", "error");
			})
		})
	}
})