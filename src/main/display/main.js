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
    init_tooltips();
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

    var $muscle_region_table = $("<table/>", {
        id: replace_whitespace_and_special_characters(muscle_region_name) + "_table",
        class: "table table-light"
    });

    var $header = $("<thead/>", {
        "html": $("<tr/>", {
            "html": $("<th/>").html(muscle_region_name),
            class: "table-success"
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
        }),
        class: "table-group-divider",
        style: "border-top-color: #999999"
    });

    $muscle_region_table.append($table_body);

    return $muscle_region_table;
}

function construct_exercises_table(muscle_region_name, exercise_list) {
    var $exercise_table = $("<table/>", {
        id: muscle_region_name + "_exercises_table",
        class: "table table-striped",
        style: "border-color: #999999"
    });

    $exercise_table.append(create_exercise_col_group());

    var $table_body = $("<tbody/>");

    exercise_list.forEach(function(exercise) {
        var $row = $("<tr/>");
        $row.append("<td>" + exercise.name + "</td>");
        $row.append("<td>" + exercise.targeted_muscles.join(", ") + "</td>");
        $row.append("<td>" + exercise.equipment + "</td>");
        $row.append($("<td/>", {html: create_edit_icon()}));
        $row.append($("<td/>", {html: create_trash_icon()}));
        $table_body.append($row);
    });

    $exercise_table.append($table_body);

    return $exercise_table;
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

function create_edit_icon() {
    return create_icon("fa-pen");
}

function create_trash_icon() {
    return create_icon("fa-trash");
}

function create_icon(icon) {
    return $("<i/>", {
                class: "fa-solid fa-sm icon " + icon
            });
}

function replace_whitespace_and_special_characters(table_name) {
    return table_name.toLowerCase().replace(/[^a-z0-9]/g, "_");
}