var active;

var email;

function widget(picture) {
    var outer = jQuery('<div></div>').append(createDraggable().append(createResizeable(picture))).addClass("container");
    return outer;
}

function createDraggable() {
    var draggable = jQuery('<div></div>').addClass("draggable").draggable({
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


function hideAll() {
    $(".active").each(function() {
        $(this).toggleClass("active");
    });
    $(".shown").each(function() {
        $(this).toggleClass("shown");
        $(this).slideToggle(200);

    });
};

function clearFrame() {
    $("#frame").css("background-image", "none");
    $("#frame").children().each(function() {
        $(this).remove();
    });
}

$(document).ready(function() {
    $("#helper").hide();
    $("#changeOutput").hide();
    //Toolbox button
    $("#showToolbox").click(function() {
            if ($("#toolbox").hasClass("shown")) {
                hideAll();
            }
            else {
                hideAll();
                $("#toolbox").toggleClass("shown");
                $("#toolbox").slideToggle(200);
                $(this).closest("li").addClass("active");
            }
        }
    );
    //Email button
    $("#showEmailInput").click(function() {
            if ($("#emailSetup").hasClass("shown")) {
                hideAll();

            }
            else {
                hideAll();
                $("#emailSetup").toggleClass("shown");
                $("#emailSetup").slideToggle(200);
                $(this).closest("li").addClass("active");
            }

        }
    );
    //template button
    $("#showTemplates").click(function() {
            if ($("#templates").hasClass("shown")) {
                hideAll();
            }
            else {
                hideAll();
                $("#templates").toggleClass("shown");
                $("#templates").slideToggle(200);
                $(this).closest("li").addClass("active");
            }

        }
    );
    //helper button
    $("#showHelp").click(function() {
            if ($("#helper").hasClass("shown")) {
                hideAll();
            }
            else {
                hideAll();
                $("#helper").toggleClass("shown");
                $("#helper").slideToggle(200);
                $(this).closest("li").addClass("active");
            }
        }
    );

    //Save email
    $("#applyEmailChange").click(function() {
        email = $("#emailInput").val();
        $("#icon").attr("src", "images/snabela.png");
        $("#registredEmail").html(email).removeClass("warning");
        $("#emailOutput").text("Dine indstillinger er blevet gemt.");
        $("#emailOutput").show();
        setTimeout(function() {
            $("#emailOutput").hide();
        }, 2000);
    });

    //Delete email
    $("#deleteEmail").click(function() {
        email = "";
        $("#icon").attr("src", "images/info.png");
        $("#registredEmail").html("Email endnu ikke opsat.").addClass("warning");
        $("#emailOutput").text("Dine indstillinger er blevet slettet.");
        $("#emailOutput").show();
        setTimeout(function() {
            $("#emailOutput").hide();
        }, 2000);
    });

    //First insert
    $("#insert1").click(function(){
        //Here we create the stuff we wish to put inside
        $("#frame").append(widget("images/Graph.jpg"));
        $("#changeOutput").show();
        setTimeout(function() {
            $("#changeOutput").hide();
        }, 2000);

    });
    //Second insert
    $("#insert2").click(function(){
        //Here we create the stuff we wish to put inside
        $("#frame").append(widget("images/Table.jpg"));
        $("#changeOutput").show();
        setTimeout(function() {
            $("#changeOutput").hide();
        }, 2000);
    });

       //Third insert
    $("#insert3").click(function(){
        //Here we create the stuff we wish to put inside
        $("#frame").append(widget("images/Text.jpg"));
        $("#changeOutput").show();
        setTimeout(function() {
            $("#changeOutput").hide();
        }, 2000);

    });

           //4'th insert
    $("#insert4").click(function(){
        //Here we create the stuff we wish to put inside
        $("#frame").append(widget("images/List.jpg"));
        $("#changeOutput").show();
        setTimeout(function() {
            $("#changeOutput").hide();
        }, 2000);

    });
    $("#clearFrame").click(function(){
        //Here we create the stuff we wish to put inside
        clearFrame();
    });

    $("#template1").click(function() {
        clearFrame();
        $("#frame").css("background-image", "url(images/template1.jpg)");
    });

    $("#template2").click(function() {
        clearFrame();
        $("#frame").css("background-image", "url(images/template2.jpg)");
    });

});


