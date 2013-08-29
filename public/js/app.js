$(function() {
    var source = $("#hn-template").html(),
        template = Handlebars.compile(source);

    $.ajax({
        url: "/hackernews.json"
    }).done(function(data) {
        if (!data.error) {
            var html = template(data);
            $("#hacker-news").html(html);
        } else {
            console.log("Server error: " + data.error);
        }
    }).fail(function(error) {
        console.log("Ajax error: " + error);
    });
});