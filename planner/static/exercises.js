$(document).ready(function() {
    register_delete_modal_observer();
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

function on_delete_clicked(node) {
    var exercise_name = node.parentsUntil("tbody").find("td").first();
    $("#delete_modal").find("i").html(exercise_name.html());
}

function register_delete_modal_observer() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            const el = mutation.target;
            if ((mutation.oldValue && mutation.oldValue.match(/\bshow\b/))
                && mutation.target.classList
                && !mutation.target.classList.contains("show")) {
                    $("#delete_modal").find("i").html("");
            }
        })
    });

    observer.observe(document.querySelector("#delete_modal"), {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: ["class"]
    });
}