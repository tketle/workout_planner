var exercises;

$.getJSON("../resources/exercises.json", function(json) {
    exercises = json;
    render_container_table("#container_table");
});

$(document).ready(function() {
    $(".hideTr").hide();
    $("[data-toggle='toggle']").click(function() {
        var table_body = $(this).parents().next(".hideTr");
        if (table_body.is(":visible")) {
            table_body.slideUp("fast");
        } else {
            table_body.slideDown("fast");
        }
    });

    $("#push_table").children(".hideTr").show();
});

function render_container_table(selector) {
    $(selector).append("<th>Anaerobic Exercises</th>");
    exercises["exercises"][1]["muscle_groups"].forEach(function(muscle_group) {
        var $row = $("<tr/>");
        $row.append(construct_muscle_group_table(muscle_group));
        $(selector).append($row);
    });
}

function construct_muscle_group_table(muscle_group) {
    var muscle_group_name = muscle_group["name"];

    var $muscle_group_table = $("<table/>", {
        id: remove_whitespace_and_special_characters(muscle_group_name) + "_table",
        class: "info muscle-group"
    });

    var $header_row = $("<tr/>");

    $header_row.append("<th data-toggle='toggle'>" + muscle_group_name + "</th>");
    $muscle_group_table.append($header_row);

    var $table_body = $("<div/>");
    $table_body.addClass("hideTr");

    muscle_group["muscle_regions"].forEach(function(muscle_region) {
        var $row = $("<tr/>");
        $row.append(construct_muscle_region_table(muscle_region));
        $table_body.append($row);
    });

    $muscle_group_table.append($table_body);

    return $muscle_group_table;
}

function construct_muscle_region_table(muscle_region) {
    var muscle_region_name = muscle_region["name"];

    var $muscle_region_table = $("<table/>", {
        id: remove_whitespace_and_special_characters(muscle_region_name) + "_table",
        class: "info muscle-region"
    });

    $muscle_region_table.append("<th>" + muscle_region_name + "</th>");

    var $row = $("<tr/>");
    $row.append(construct_exercises_table(
        remove_whitespace_and_special_characters(muscle_region_name), muscle_region["exercises"]));

    $muscle_region_table.append($row);

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

function remove_whitespace_and_special_characters(table_name) {
    return table_name.toLowerCase().replace(/[^a-zA-Z0-9]/g, "_");
}