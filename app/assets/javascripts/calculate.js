// constants
var sections = 12;
var grades = $('#invisible').data('grades');
var course = $('#invisible').data('course');
var letters = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'].reverse();

window.onload = function() {
    calculateValues();
};

function calculateValues(){
    // Holds all of the threshold values
    var thresholds = getThresholds();
    var errorFlag = validation(thresholds);

    // Holds the number of steps the histogram will display for each category
    var numberOfStudents = new Array(sections-1).fill(0);
    // Filter and count
    for (var j = 0; j < thresholds.length-1; j++){
        for (var m = 0; m < grades.length; m++) {
            if (grades[m]['percentage'] >= thresholds[j] && grades[m]['percentage'] < thresholds[j+1]) {
                numberOfStudents[j]++;
                grades[m]['lettergrade'] = letters[j];
            }
        }
    }

    setProgress(errorFlag, numberOfStudents);
}

// Sets the progress of all of the histogram bars
function setProgress(errorFlag, dataArray){
    // Set DOM objects
    console.log(grades);
    for (var k = 0; k < dataArray.length; k++){
        document.getElementById("result" + k + "progress").value = (errorFlag) ? 0 : dataArray[k];
        document.getElementById("result" + k + "progress").max = "" + dataArray.reduce(function (p1, p2) { return Math.max(p1, p2) });
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

function saveGrades(){
    console.log(grades);
    console.log(course);
    for (var grade in grades) {
        console.log(grades[grade]);
        var enrollToSave = grades[grade]
        $.ajax({
            url: '/enrolls/update/'+grades[grade]['id'],
            type: 'POST',
            data: { 'enroll':
                        {'lettergrade': enrollToSave['lettergrade'], 'percentage': enrollToSave['percentage'], 'course': course['id']},
                    'id': enrollToSave['id']
                    },
            success: function(data){
                alert('Success!')
            },
            error: function(data){
                console.log(data);
            },
            done: function(data){
                console.log(data);
            }
        })
    }

}