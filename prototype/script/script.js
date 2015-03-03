var counter = 10;

invisible = function() {
    return this.css('visibility', 'hidden');
};

function table(picture) {
    var draggable = jQuery('<div/>', {}).addClass("container").draggable({
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
    var resizeable =  jQuery('<div/>');
    resizeable.css('background-image', 'url(' + picture + ')');
    resizeable.css('background-size', '100% 100%');
    resizeable.css('background-repeat', 'no-repeat');
    resizeable.append(settingsButton());
    resizeable.resizable({
        containment: "#frame",
        grid: 20
    });
    draggable.append(resizeable);
    var outer = jQuery('<div/>').append(draggable);
    return outer;
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
        $(this).closest(".container").css('visibility', 'hidden');

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
        $("#frame").append(table("images/Graph.jpg"));
        counter = counter+1;
    })
    //Second insert
    $("#insert2").click(function(){
        //Here we create the stuff we wish to put inside
        $("#frame").append(table("images/Table.jpg"));
    })

       //Third insert
    $("#insert3").click(function(){
        //Here we create the stuff we wish to put inside
        $("#frame").append(table("images/Text.jpg"));

    })

           //4'th insert
    $("#insert4").click(function(){
        //Here we create the stuff we wish to put inside
        $("#frame").append(table("images/List.jpg").append(settingsButton()).resizable({
            containment: "#frame",
            grid: 20
        }));

    })
});

