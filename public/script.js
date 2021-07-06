$(document).bind("contextmenu", function (event) {
    event.preventDefault();
    $(".context-menu").css("display", "block");
    $(".context-menu").css("left", event.pageX);
    $(".context-menu").css("top", event.pageY);
});

$(document).bind("click", function() {
    $(".context-menu").css("display", "none");
    $(".context-menu").css("left", event.pageX);
    $(".context-menu").css("top", event.pageY);
});