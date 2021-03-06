// serves as the array that all algorithms will use
var globalArray;

// worker variables
var builder = new Worker("workers/build.js");
var quicker = new Worker("workers/quick.js");
var bubbler = new Worker("workers/bubble.js");
var selecter = new Worker("workers/select.js");

// variables for building graph
var Quick = [];
var Bubble = [];
var Select = [];

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var xScale;
var yScale;
var sections;

var xAxis = [""];

// listens to clear button. clears data and page
document.getElementById("clear").addEventListener("click", function() {
    document.getElementById("quickPerform").innerText = "Time: Null";
    document.getElementById("bubblePerform").innerText = "Time: Null";
    document.getElementById("selectPerform").innerText = "Time: Null";

    document.getElementById("build").removeAttribute("disabled");
    document.getElementById("select").removeAttribute("disabled");
    document.getElementById("quick").removeAttribute("disabled");
    document.getElementById("bubble").removeAttribute("disabled");
    document.getElementById("canvas").setAttribute("hidden", "true");

    document.getElementById("quick").innerText = "Quick";
    document.getElementById("bubble").innerText = "Bubble";
    document.getElementById("select").innerText = "Select";
    document.getElementById("build").innerText = "Build";

    // terminates any active workers
    builder.terminate();
    quicker.terminate();
    bubbler.terminate();
    selecter.terminate();

    // clears graph
    canvas.width = canvas.width;

    // resets variables
    globalArray = undefined;
    Quick = [];
    Bubble = [];
    Select = [];
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    xScale;
    yScale;
    xAxis = [""];
});

// listens to build button to run arrayBuild function
document.getElementById("build").addEventListener("click", function() {
    builder = new Worker("workers/build.js");
    var length = document.getElementById("length").value;
    var build = document.getElementById("build");

    if (length > 0) {
        build.setAttribute("disabled", "true");
        build.innerText = "Building";

        builder.postMessage({ type: "build", data: length });
        builder.onmessage = function(event) {
            globalArray = event.data.array;

            buildGraph();

            document.getElementById("build").innerText = "Built";
        };
    } else {
        console.log("Invalid input");
    }
});

// listens to quick button and runs quicksort function
document.getElementById("quick").addEventListener("click", function() {
    const quick = document.getElementById("quick");
    quicker = new Worker("workers/quick.js");

    if (globalArray.length > 0) {
        quick.setAttribute("disabled", "true");
        quick.innerText = "Sorting";

        quicker.postMessage({ type: "quicksort", data: globalArray });
        quicker.onmessage = function(event) {
            document.getElementById("quickPerform").innerText =
                "Time: " + event.data.time + " milliseconds";
            quick.innerText = "Done";
            Quick = event.data.timeArray;
            context.strokeStyle = "#007bff";
            plotData(Quick);
        };
    } else {
        console.log("globalArray invalid");
    }
});

// listens to bubble button and runs bubble sort function
document.getElementById("bubble").addEventListener("click", function() {
    const bubble = document.getElementById("bubble");
    bubbler = new Worker("workers/bubble.js");

    if (globalArray.length > 0) {
        bubble.setAttribute("disabled", "true");
        bubble.innerText = "Sorting";

        bubbler.postMessage({ type: "bubblesort", data: globalArray });
        bubbler.onmessage = function(event) {
            document.getElementById("bubblePerform").innerText =
                "Time: " + event.data.time + " milliseconds";
            bubble.innerText = "Done";
            Bubble = event.data.timeArray;
            context.strokeStyle = "#dc3545";
            plotData(Bubble);
        };
    } else {
        console.log("globalArray invalid");
    }
});

// listens to select button and runs select sort function
document.getElementById("select").addEventListener("click", function() {
    const select = document.getElementById("select");
    selecter = new Worker("workers/select.js");

    if (globalArray.length > 0) {
        select.setAttribute("disabled", "true");
        select.innerText = "Sorting";

        selecter.postMessage({ type: "selectsort", data: globalArray });
        selecter.onmessage = function(event) {
            document.getElementById("selectPerform").innerText =
                "Time: " + event.data.time + " milliseconds";
            select.innerText = "Done";
            Select = event.data.timeArray;
            context.strokeStyle = "#28a745";
            plotData(Select);
        };
    } else {
        console.log("globalArray invalid");
    }
});

// builds an empty graph
function buildGraph() {
    // set these values for your data
    sections = 10;
    Val_max = 100;
    Val_min = 0;
    var stepSize = 10;
    var columnSize = 50;
    var rowSize = 50;
    var margin = 5;

    buildXAxis();

    context.fillStyle = "#0099ff";
    context.font = "20 pt Verdana";

    yScale = (canvas.height - columnSize - margin) / (Val_max - Val_min);
    xScale = (canvas.width - rowSize) / sections;

    context.strokeStyle = "#000"; // color of grid lines
    context.beginPath();
    // print Parameters on X axis, and grid lines on the graph
    for (i = 1; i <= sections; i++) {
        var x = i * xScale;
        context.fillText(xAxis[i], x, columnSize - margin);
        context.moveTo(x, columnSize);
        context.lineTo(x, canvas.height - margin);
    }
    // print row header and draw horizontal grid lines
    var count = 0;
    for (scale = Val_max; scale >= Val_min; scale = scale - stepSize) {
        var y = columnSize + yScale * count * stepSize;
        context.fillText(scale, margin, y + margin);
        context.moveTo(rowSize, y);
        context.lineTo(canvas.width, y);
        count++;
    }
    context.stroke();

    context.translate(rowSize, canvas.height + Val_min * yScale);
    context.scale(1, -1 * yScale);

    document.getElementById("canvas").removeAttribute("hidden");
}

// plots data points on constructed graph
function plotData(dataSet) {
    context.beginPath();
    context.moveTo(0, dataSet[0]);
    index = parseInt(dataSet.length * 0.1);
    for (i = 1; i <= sections; i++) {
        context.lineTo(i * xScale, dataSet[index]);
        index += parseInt(dataSet.length * 0.1) - 1;
    }
    context.stroke();
}

// builds xAxis for the graph based on globalArray length
function buildXAxis() {
    for (var i = 0; i <= globalArray.length; i += globalArray.length * 0.1) {
        i = parseFloat(i.toFixed(1));
        xAxis.push(i);
    }
}
