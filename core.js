// serves as the array that all algorithms will use
var globalArray;

// builds array
function arrayBuild(length) {
    array = [];
    for (var i = 0; i < length; i++) {
        array.push(Math.ceil(Math.random() * length));
    }
    return array;
}

// listens to clear button. clears data and page
document.getElementById("clear").addEventListener("click", function() {
    document.getElementById("quickPerform").innerText = "";
    document.getElementById("bubblePerform").innerText = "";

    document.getElementById("build").removeAttribute("disabled");
    document.getElementById("select").removeAttribute("disabled");
    document.getElementById("quick").removeAttribute("disabled");
    document.getElementById("bubble").removeAttribute("disabled");

    document.getElementById("quick").innerText = "Quick";
    document.getElementById("bubble").innerText = "Bubble";

    globalArray = undefined;
});

// listens to build button to run arrayBuild function
document.getElementById("build").addEventListener("click", function() {
    var length = document.getElementById("length").value;

    if (length > 0) {
        globalArray = arrayBuild(length);

        console.log("Array: " + globalArray);

        document.getElementById("build").setAttribute("disabled", "true");
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
        bubble.innerText = "Loading"

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
        };
    } else {
        console.log("globalArray invalid");
    }
});
