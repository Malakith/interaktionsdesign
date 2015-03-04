var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

var company = new Array();
company[0] = "NRGI";
company[1] = "Vindstød A/S";
company[2] = "Switch.dk";

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

//calculates the montly prices
function getMonthlyPrice(i) {
    var ret = [0, 0, 0];
    for (var j = 0; j<31; j++) {
        ret[0] = ret[0]+(prices[0][i][j]*data[i][j]);
        ret[1] = ret[1]+(prices[1][i][j]*data[i][j]);
        ret[2] = ret[2]+(prices[2][i][j]*data[i][j]);
    }
    return ret;
}


//We need to populate a list with data.
var data = createArray(12, 31);

for (var i = 0; i < 12; i++) {
    for (var j = 0; j < 31; j++) {
        data[i][j] = Math.round(4.1 + (Math.random()*2.8));
    }
}


//We generate some prices.
var prices = createArray(3, 12, 31);


for (var j = 0; j < 12; j++) {
    for (var k = 0; k < 31; k++) {
        prices[0][j][k] = 1.8+(Math.random()*0.2);
        prices[1][j][k] = 1.9+(Math.random()*0.2);
        prices[2][j][k] = 1.8+(Math.random()*0.3);
    }
}


