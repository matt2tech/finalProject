// serves as the array that all algorithms will use
var globalArray;

// listens to clear button. clears data and page
// document.getElementById("clear").addEventListener("click", function() {
//     document.getElementById("quickPerform").innerText = "";
//     document.getElementById("bubblePerform").innerText = "";

//     document.getElementById("build").removeAttribute("disabled");
//     document.getElementById("select").setAttribute("disabled", "true");
//     document.getElementById("quick").setAttribute("disabled", "true");
//     document.getElementById("bubble").setAttribute("disabled", "true");

//     document.getElementById("quick").innerText = "Quick";
//     document.getElementById("bubble").innerText = "Bubble";
//     document.getElementById("build").innerText = "Build";

//     globalArray = undefined;
// });

// listens to build button to run arrayBuild function
document.getElementById("build").addEventListener("click", function() {
    const worker = new Worker("workers/build.js");
    var length = document.getElementById("length").value;
    var build = document.getElementById("build")

    if (length > 0) {
        build.setAttribute("disabled", "true");
        build.innerText = "Building";

        worker.postMessage({type: "build", data: length});
        worker.onmessage = function(event) {
            globalArray = event.data.array;
            console.log("Array: " + globalArray);
            document.getElementById("build").innerText = "Built";
            document.getElementById("select").removeAttribute("disabled");
            document.getElementById("quick").removeAttribute("disabled");
            document.getElementById("bubble").removeAttribute("disabled");
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
        };
    } else {
        console.log("globalArray invalid");
    }
});
