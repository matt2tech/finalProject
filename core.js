// serves as the array that all algorithms will use
var globalArray;

// listens to clear button. clears data and page
document.getElementById("clear").addEventListener("click", function() {
    document.getElementById("quickPerform").innerText = "";
    document.getElementById("bubblePerform").innerText = "";
    document.getElementById("selectPerform").innerText = "";

    document.getElementById("build").removeAttribute("disabled");
    document.getElementById("select").removeAttribute("disabled");
    document.getElementById("quick").removeAttribute("disabled");
    document.getElementById("bubble").removeAttribute("disabled");

    document.getElementById("quick").innerText = "Quick";
    document.getElementById("bubble").innerText = "Bubble";
    document.getElementById("select").innerText = "Select";
    document.getElementById("build").innerText = "Build";

    globalArray = undefined;
});

// listens to build button to run arrayBuild function
document.getElementById("build").addEventListener("click", function() {
    const worker = new Worker("workers/build.js");
    var length = document.getElementById("length").value;
    var build = document.getElementById("build");

    document.getElementById("clear").setAttribute("disabled", "true");

    if (length > 0) {
        build.setAttribute("disabled", "true");
        build.innerText = "Building";

        worker.postMessage({type: "build", data: length});
        worker.onmessage = function(event) {
            globalArray = event.data.array;
            console.log("Array: " + globalArray);

            buildGraph();

            document.getElementById("build").innerText = "Built";
            document.getElementById("clear").removeAttribute("disabled");
        }
    } else {
        console.log("Invalid number");
    }
});

// listens to quick button and runs quicksort function
document.getElementById("quick").addEventListener("click", function() {
    const worker = new Worker("workers/quick.js");
    const quick = document.getElementById("quick")

    if (globalArray.length > 0) {
        quick.setAttribute("disabled", "true");
        quick.innerText = "Sorting";

        worker.postMessage({ type: "quicksort", data: globalArray });
        worker.onmessage = function(event) {
            console.log("Quick Sort: " + event.data.array);
            document.getElementById("quickPerform").innerText =
                "Length: " +
                globalArray.length +
                " indices" +
                "\nTime: " +
                event.data.time +
                " milliseconds";
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
    const worker = new Worker("workers/bubble.js");
    const bubble = document.getElementById("bubble");

    if (globalArray.length > 0) {
        bubble.setAttribute("disabled", "true");
        bubble.innerText = "Sorting";

        worker.postMessage({ type: "bubblesort", data: globalArray });
        worker.onmessage = function(event) {
            console.log("Bubble Sort: " + event.data.array);
            document.getElementById("bubblePerform").innerText =
                "Length: " +
                globalArray.length +
                " indices" +
                "\nTime: " +
                event.data.time +
                " milliseconds";
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
    const worker = new Worker("workers/select.js");
    const select = document.getElementById("select");

    if (globalArray.length > 0) {
        select.setAttribute("disabled", "true");
        select.innerText = "Sorting";

        worker.postMessage({ type: "selectsort", data: globalArray });
        worker.onmessage = function(event) {
            console.log("Selection Sort: " + event.data.array);
            document.getElementById("selectPerform").innerText =
                "Length: " +
                globalArray.length +
                " indices" +
                "\nTime: " +
                event.data.time +
                " milliseconds";
            select.innerText = "Done";
            Select = event.data.timeArray;
            context.strokeStyle = "#28a745";
            plotData(Select);
        };
    } else {
        console.log("globalArray invalid");
    }
});

// variables for building graph
var Quick = [];
var Bubble = [];
var Select = [];


var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var xScale;
var yScale;

var xAxis = [""]

function buildGraph() {
    // Values for the Data Plot, they can also be obtained from a external file
            // set these values for your data
            sections = 11;
            Val_max = 130;
            Val_min = 0;
            var stepSize = 10;
            var columnSize = 55;
            var rowSize = 50;
            var margin = 10;

            buildXAxis();

            context.fillStyle = "#0099ff";
            context.font = "20 pt Verdana";

            yScale =
                (canvas.height - columnSize - margin) / (Val_max - Val_min);
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

            document.getElementById("chart").removeAttribute("hidden");
        }

function plotData(dataSet) {
    context.beginPath();
    context.moveTo(0, dataSet[0]);
    for (i = 1; i < sections; i++) {
        context.lineTo(i * xScale, dataSet[i]);
    }
    context.stroke();
}

function buildXAxis() {
    for(var i = 0; i <= globalArray.length; i += globalArray.length * 0.1) {
            i = parseFloat(i.toFixed(1));
            xAxis.push(i);
    }
}
