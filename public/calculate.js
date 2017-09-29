// constants
var sections = 12;
var grades = [65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03, 9.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01];
//var grades = [50, 60, 70, 80, 90];

window.onload = function() {
    calculateValues();
};

function calculateValues(){

    // Holds all of the threshold values
    var thresholds = getThresholds()
    var errorFlag = validation(thresholds);

    // Holds the number of steps the histogram will display for each category
    var numberOfStudents = new Array(sections-1).fill(0);
    // Filter and count
    for (var j = 0; j < thresholds.length-1; j++){
        for (var m = 0; m < grades.length; m++) {
            if (grades[m] >= thresholds[j] && grades[m] < thresholds[j+1]) {
                numberOfStudents[j]++;
            }
        }
    }

    setProgress(errorFlag, numberOfStudents);
}

// Sets the progress of all of the histogram bars
function setProgress(errorFlag, dataArray){
    // Set DOM objects
    for (var k = 0; k < dataArray.length; k++){
        document.getElementById("result" + k + "progress").value = (errorFlag) ? 0 : dataArray[k];
        document.getElementById("result" + k + "progress").max = "" + dataArray.reduce(function (p1, p2) { return Math.max(p1, p2) }) ;
    }
}

// Gets all user entered data
function getThresholds(){
    // Holds all of the threshold values
    var thresholds = [];
    // Sets up the threshold values via DOM
    for (var i = 0; i < sections; i++){ thresholds[i] = parseFloat(document.getElementById("threshold"+i).value); }
    return thresholds;
}

// Checks that thresholds are valid (ex. are in sorted order) and highlights any errors
function validation(thresholds){
    var errorFlag = false;
    for (var n = 0; n < sections-1; n++){
        if (thresholds[n] >= thresholds[n+1]){
            document.getElementById("threshold"+n).style.color = "red";
            errorFlag = true;
        } else {
            document.getElementById("threshold"+n).style.color = "black";
        }
    }
    return errorFlag;
}

// Forces input into 2 decimal place format
function formatValues(input) {
    input.value = parseFloat(input.value).toFixed(2);
}