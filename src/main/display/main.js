var exercises;

$(document).ready(function() {
    $.getJSON("../resources/exercises.json", function(json) {
        exercises = json;
        render_container_table();
    });
});

function render_container_table() {
    var muscle_groups_list = exercises["exercises"][1]["muscle_groups"];
    render_muscle_group_content("#push_container", muscle_groups_list[0]);
    render_muscle_group_content("#pull_container", muscle_groups_list[1]);
    render_muscle_group_content("#core_container", muscle_groups_list[2]);
    render_muscle_group_content("#legs_container", muscle_groups_list[3]);
}

function render_muscle_group_content(selector, muscle_group) {
    var $accordion_body = $(selector).find(".accordion-body");

    muscle_group["muscle_regions"].forEach(function(muscle_region) {
        var $list_item = $("<i/>");
        $list_item.append(construct_muscle_region_table(muscle_region));
        $accordion_body.append($list_item);
    });
}

function construct_muscle_region_table(muscle_region) {
    var muscle_region_name = muscle_region["name"];
    var muscle_region_name_treated = replace_whitespace_and_special_characters(muscle_region_name);

    var $muscle_region_table = $("<table/>", {
        id: muscle_region_name_treated + "_table",
        class: "table table-light table-striped"
    });

    $muscle_region_table.append(construct_muscle_region_header(muscle_region_name));
    $muscle_region_table.append(create_exercise_col_group());

    var $table_body = $("<tbody/>").addClass("table-group-divider").css("border-top-color", "#999999");

    muscle_region["exercises"].forEach(function(exercise) {
        var $row = $("<tr/>");
        $row.append("<td>" + exercise.name + "</td>");
        $row.append("<td>" + exercise.targeted_muscles.join(", ") + "</td>");
        $row.append("<td>" + exercise.equipment + "</td>");
        $row.append($("<td/>", {html: create_fa_icon("pen", "fa-sm")}));
        $row.append($("<td/>", {html: create_fa_icon("trash", "fa-sm")}));
        $table_body.append($row);
    });

    $muscle_region_table.append($table_body);

    return $muscle_region_table;
}

function construct_muscle_region_header(muscle_region_name) {
    var $header_row = $("<tr/>", {class: "table-success"});

    $header_row.append($("<th/>", {
        html: muscle_region_name,
        scope: "col"
    }));

    $header_row.append($("<th/>", {
        html: create_fa_icon("square-plus", "fa-xl").css("color", "#809971"),
        scope: "col",
        colspan: 4,
        class: "text-end",
        style: "padding-right: 15px;"
    }));

    return $("<thead/>").html($header_row);
}

function create_exercise_col_group() {
    var $col_group = $("<colgroup/>");
    $col_group.append($("<col/>", {class: "col-md-4"}));
    $col_group.append($("<col/>", {class: "col-md-4"}));
    $col_group.append($("<col/>", {class: "col-md-4"}));
    $col_group.append($("<col/>", {class: "col-md-4"}));
    $col_group.append($("<col/>", {class: "col-md-4"}));

    return $col_group;
}

function create_fa_icon(icon, size) {
    return $("<i/>", {
                class: "fa-solid " + size + " icon fa-" + icon
            });
}

function replace_whitespace_and_special_characters(table_name) {
    return table_name.toLowerCase().replace(/[^a-z0-9]/g, "_");
}