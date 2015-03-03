 function widget(picture) {
    var outer = jQuery('<div></div>').append(createDraggable().append(createResizeable(picture))).addClass("container");
    return outer;
}

function createDraggable() {
    var draggable = jQuery('<div></div>', {}).addClass("draggable").draggable({
        containment: "#frame",
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
    return draggable;
}

function createResizeable(picture) {
    var resizeable = jQuery('<div></div>').addClass("resizeable");
    resizeable.css('background-image', 'url(' + picture + ')');
    resizeable.css('background-size', '100% 100%');
    resizeable.css('background-repeat', 'no-repeat');
    resizeable.append(settingsButton());
    resizeable.resizable({
        containment: "#frame",
        grid: 20
    });
    return resizeable;
}

function settingsButton() {
    var button = jQuery('<img src="images/Settings.jpg">', {}).addClass("settingsButton");

    button.click(function(){
        $(this).closest(".resizeable").append(options());
    });
    return button;
}

function options() {
    var options = jQuery('<div></div>', {}).addClass("options");
    var closeButton = jQuery('<img src="images/Close.jpg"/>', {}).addClass("closeButton");
    var container = $(this).closest(".container");
    $(this).height(container.height());
    $(this).width(container.width());
    closeButton.click(function(){
        $(this).closest(".draggable").hide(200);

    });
    options.append(closeButton);
    return options;
}

$(document).ready(function() {
    //Form code:
    $("#form").submit(function (e) {
        e.preventDefault();
        $("#mailInput").toggle(200);
    });
    //Toolbox button
    $("#showToolbox").click(function() {
            $("#toolbox").slideToggle(200);
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
        $("#frame").append(widget("images/Graph.jpg"));

    });
    //Second insert
    $("#insert2").click(function(){
        //Here we create the stuff we wish to put inside
        $("#frame").append(widget("images/Table.jpg"));
    });

       //Third insert
    $("#insert3").click(function(){
        //Here we create the stuff we wish to put inside
        $("#frame").append(widget("images/Text.jpg"));

    });

           //4'th insert
    $("#insert4").click(function(){
        //Here we create the stuff we wish to put inside
        $("#frame").append(widget("images/List.jpg"));

    });
});

