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
        saveChanges();
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



function saveChanges() {
    $("#message").text("Last saved : " + timeStamp());
}

$(document).ready(function() {

    $("#frame").mousedown(function() {
        $(window).mousemove(function() {
            isDragging = true;
            $(window).unbind("mousemove");
        });
    })
        .mouseup(function() {
            var wasDragging = isDragging;
            isDragging = false;
            $(window).unbind("mousemove");
            if (wasDragging) { //was clicking
                saveChanges();
            }
        });

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
        saveChanges();
    });
    //Second insert
    $("#insert2").click(function(){
        //Here we create the stuff we wish to put inside
        $("#frame").append(widget("images/Table.jpg"));
        $("#changeOutput").show();
        setTimeout(function() {
            $("#changeOutput").hide();
        }, 2000);
        saveChanges();
    });

       //Third insert
    $("#insert3").click(function(){
        //Here we create the stuff we wish to put inside
        $("#frame").append(widget("images/Text.jpg"));
        $("#changeOutput").show();
        setTimeout(function() {
            $("#changeOutput").hide();
        }, 2000);
        saveChanges();
    });

           //4'th insert
    $("#insert4").click(function(){
        //Here we create the stuff we wish to put inside
        $("#frame").append(widget("images/List.jpg"));
        $("#changeOutput").show();
        setTimeout(function() {
            $("#changeOutput").hide();
        }, 2000);
        saveChanges();
    });
    $("#clearFrame").click(function(){
        //Here we create the stuff we wish to put inside
        clearFrame();
        saveChanges();
    });

    $("#template1").click(function() {
        clearFrame();
        $("#frame").css("background-image", "url(images/template1.jpg)");
        saveChanges();
    });

    $("#template2").click(function() {
        clearFrame();
        $("#frame").css("background-image", "url(images/template2.jpg)");
        saveChanges();
    });

});

function timeStamp() {
// Create a date object with the current time
    var now = new Date();

// Create an array with the current month, day and time
    var date = [ now.getDate() + 1, now.getMonth(), now.getFullYear() ];

// Create an array with the current hour, minute and second
    var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];

// Determine AM or PM suffix based on the hour
    var suffix = ( time[0] < 12 ) ? "AM" : "PM";

// Convert hour from military time
    time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

// If hour is 0, set it to 12
    time[0] = time[0] || 12;

// If seconds and minutes are less than 10, add a zero
    for ( var i = 1; i < 3; i++ ) {
        if ( time[i] < 10 ) {
            time[i] = "0" + time[i];
        }
    }

// Return the formatted string
    return date.join("/") + " " + time.join(":") + " " + suffix;
}
