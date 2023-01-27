var exercises;

$.getJSON("../resources/exercises.json", function(json) {
    exercises = json;
    render_container_table();
});

$(document).ready(function() {
    $(".hideTr").hide();
    $("[data-toggle='toggle']").click(function() {
        var $table_body = $(this).parentsUntil("td", "table").find(".hideTr");
        var $caret_icon = $(this).parentsUntil("td", "table").find("i").first();

        if ($table_body.is(":visible")) {
            $table_body.slideUp("fast");
            $caret_icon.removeClass("fa-caret-down");
            $caret_icon.addClass("fa-caret-right");
        } else {
            $table_body.slideDown("fast");
            $caret_icon.removeClass("fa-caret-up");
            $caret_icon.addClass("fa-caret-down");
        }
    });

    $("#push_table").find(".hideTr").show();
});

function render_container_table() {
    var muscle_groups_list = exercises["exercises"][1]["muscle_groups"];
    render_muscle_group_table("#push_table", muscle_groups_list[0]);
    render_muscle_group_table("#pull_table", muscle_groups_list[1]);
    render_muscle_group_table("#core_table", muscle_groups_list[2]);
    render_muscle_group_table("#legs_table", muscle_groups_list[3]);
}

function render_muscle_group_table(selector, muscle_group) {
    var $table_body = $(selector).find("div.hideTr");

    muscle_group["muscle_regions"].forEach(function(muscle_region) {
        var $row = $("<tr/>");
        var $data = $("<td/>");
        $data.append(construct_muscle_region_table(muscle_region));
        $row.append($data);
        $table_body.append($row);
    });
}

function construct_muscle_region_table(muscle_region) {
    var muscle_region_name = muscle_region["name"];

    var $muscle_region_table = $("<table/>", {
        id: replace_whitespace_and_special_characters(muscle_region_name) + "_table",
        class: "info muscle-region"
    });

    var $header = $("<thead/>", {
        "html": $("<tr/>", {
            "html": $("<th/>").html(muscle_region_name)
        })
    });

    $muscle_region_table.append($header);

    var $table_body = $("<tbody/>", {
        "html": $("<tr/>", {
            "html": $("<td/>", {
                "html": construct_exercises_table(
                    replace_whitespace_and_special_characters(muscle_region_name),
                        muscle_region["exercises"])
            })
        })
    });

    $muscle_region_table.append($table_body);

    return $muscle_region_table;
}

function construct_exercises_table(muscle_region_name, exercise_list) {
    var $exercise_table = $("<table/>", {
        id: muscle_region_name + "_exercises_table",
        class: "info exercises"
    });

    exercise_list.forEach(function(exercise) {
        var $row = $("<tr/>");
        $row.append("<td>" + exercise.name + "</td>");
        $row.append("<td>" + exercise.targeted_muscles.join(", ") + "</td>");
        $row.append("<td>" + exercise.equipment + "</td>");
        $exercise_table.append($row);
    });

    return $exercise_table;
}

function replace_whitespace_and_special_characters(table_name) {
    return table_name.toLowerCase().replace(/[^a-zA-Z0-9]/g, "_");
}