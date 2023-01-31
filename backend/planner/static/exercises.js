var exercises;

$(document).ready(function() {
    exercises = eval($("#exercise_data").data("exercises"));
    init_show_delete_modal_handler("#delete_modal");
    init_fa_icon_hover_behavior(".fa-square-plus", "fa-xl", "fa-2xl");
    init_fa_icon_hover_behavior(".fa-pen", "fa-xs", "fa-sm");
    init_fa_icon_hover_behavior(".fa-trash", "fa-xs", "fa-sm");
});

function init_fa_icon_hover_behavior(selector, normal_size, hover_size) {
    $(selector).mouseenter(function() {
        $(this).removeClass(normal_size).addClass(hover_size);
    });
    $(selector).mouseleave(function() {
        $(this).removeClass(hover_size).addClass(normal_size);
    });
}

function on_delete_icon_clicked(node) {
    var row_data = node.parentsUntil("tbody", "tr").children();
    $("#delete_modal").find(".modal-content").data("exercise", {
        id: $(row_data[0]).html(),
        name: $(row_data[1]).html()
    });

    $("#delete_modal").modal("show");
}

function on_delete_clicked(exercise_id) {
    $.ajax({
        url: "exercises/anaerobic/" + exercise_id,
        type: "DELETE",
        success: function(result) {
            var muscle_groups = exercises['exercises'][1]['muscle_groups'];
            var muscle_regions = muscle_groups[result['group_idx']]['muscle_regions']
            muscle_regions[result['region_idx']]['exercises'] = result['exercises'];
            var table_id = "#" + treat_text(muscle_regions[result["region_idx"]]["name"]) + "_table";

            $(table_id).load(document.URL + " " + table_id);
            show_delete_success_alert();
        }
    })
}

function get_delete_data() {
    return $("#delete_modal").find(".modal-content").data("exercise");
}

function init_show_delete_modal_handler(selector) {
    $(selector).on("show.bs.modal", function(event) {
        var $content = $(selector).find(".modal-content");
        $content.find("i").html($content.data("exercise").name);
    });

    $(selector).on("hidden.bs.modal", function(event) {
        var $content = $("#delete_modal").find(".modal-content");
        $content.data("exercise", "");
        $content.find("i").html("");
    });
}

function show_delete_success_alert() {
    var $alert = $("#delete_success_alert");
    $alert.show();
    $alert.fadeTo(2000, 50)
        .slideUp(500, function() {
            $alert.slideUp(500);
        });
}

function treat_text(text) {
    return text.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
}