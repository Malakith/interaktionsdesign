function table(picture) {
    container = jQuery('<div/>', {}).addClass("container").draggable({
        containment: "parent",
        drag: function( event, ui ) {
            var snapTolerance = $(this).draggable('option', 'snapTolerance');
            var topRemainder = ui.position.top % 20;
            var leftRemainder = ui.position.left % 20;

            if (topRemainder <= snapTolerance) {
                ui.position.top = ui.position.top - topRemainder;
            }

            if (leftRemainder <= snapTolerance) {
                ui.position.left = ui.position.left - leftRemainder;
            }
        }
    });
    container.css('background-image', 'url(' + picture + ')');
    container.css('background-size', '100% 100%');
    container.css('background-repeat', 'no-repeat');
    return container;
};

function settingsButton() {
    var button = jQuery('<img src="images/settings.jpg">', {}).addClass("settingsButton");

    button.click(function(){
        $(this).closest(".container").append(options());
    });
    return button;
};

function options() {
    var options = jQuery('<div/>', {}).addClass("options");
    var closeButton = jQuery('<img src="images/Close.jpg"/>', {}).addClass("closeButton");
    var container = $(this).closest(".container");
    $(this).height(container.height());
    $(this).width(container.width());
    closeButton.click(function(){
        $(this).closest(".container").fadeOut(200, function() { $(this).remove(); });
    });
    options.append(closeButton);
    return options;
};

$(document).ready(function() {
    //Form code:
    $("#form").submit(function (e) {
        e.preventDefault();
        $("#mailInput").toggle(200);
    });
    //Toolbox button
    $("#showToolbox").click(function() {
            $("#toolbox").toggle(200);
        }
    );
    //Email button
    $("#showEmailInput").click(function() {
            $("#mailInput").toggle(200);
        }
    );

    //First insert
    $("#insert1").click(function(){
        //Here we create the stuff we wish to put inside
        $("#frame").append(table("images/Graph.jpg").append(settingsButton()).resizable({
            containment: "#frame",
            grid: 20
        }));
    })
    //Second insert
    $("#insert2").click(function(){
        //Here we create the stuff we wish to put inside
        $("#frame").append(table("images/Table.jpg").append(settingsButton()));
    })
});