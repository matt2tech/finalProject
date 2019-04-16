// serves as the array that all algorithms will use
var globalArray;

// code for quicksort algorithm
function quickSort(array) {
    var less = [];
    var greater = [];

    if (array.length < 2) {
        return array;
    } else {
        var pivot = array[0];

        for(var i = 1; i < array.length; i++) {
            if (array[i] <= pivot) {
                less.push(array[i]);
            } else {
                greater.push(array[i]);
            }
        }
        return quickSort(less).concat([pivot].concat(quickSort(greater)));
    }
}

// code for bubble sort algorithm
function bubbleSort(array) {
    for(var i = 0; i < array.length; i++) {
        for(var x = 0; x < array.length; x++) {
            if(array[x] > array[x+1]) {
                temp = array[x];
                array[x] = array[x+1]
                array[x+1] = temp
            } else {
                continue
            }
        }
    }
    return array
}

// builds array
function arrayBuild(length) {
    array = [];
    for(var i = 0; i < length; i++) {
        array.push(Math.ceil(Math.random() * length));
    }
    return array;
}

// listens to clear button. clears data and page
document.getElementById("clear").addEventListener("click", function(){
   document.getElementById("quickPerform").innerText = "";
   document.getElementById("bubblePerform").innerText = "";

   document.getElementById("build").removeAttribute("disabled");
   document.getElementById("select").removeAttribute("disabled");
   document.getElementById("quick").removeAttribute("disabled");
   document.getElementById("bubble").removeAttribute("disabled")

   globalArray = undefined
})

// listens to build button to run arrayBuild function
document.getElementById("build").addEventListener("click", function() {
    var length = document.getElementById("length").value;

    if (length > 0) {
    globalArray = arrayBuild(length);

    console.log("Array: " + globalArray);

    document.getElementById("build").setAttribute("disabled", "true");
    } else {
        console.log
    }
})

// listens to quick button and runs quicksort function
document.getElementById("quick").addEventListener("click", function() {
    var start = performance.now();
    var qSort = quickSort(globalArray);
    var end = performance.now();

    console.log("Quicksort: " + qSort);

    var quickPerform = document.getElementById("quickPerform");
    quickPerform.innerText = "Length: " + globalArray.length + " indices" + "\nTime: " + (end - start) + " milliseconds"; 

    document.getElementById("quick").setAttribute("disabled", "true");
})

// listens to bubble button and runs bubble sort function
document.getElementById("bubble").addEventListener("click", function() {
    var start = performance.now();
    var bSort = bubbleSort(globalArray);
    var end = performance.now();

    console.log("Bubblesort: " + bSort);

    document.getElementById("bubblePerform").innerText = "Length: " + globalArray.length + " indices" + "\nTime: " + (end - start) + " milliseconds";

    document.getElementById("bubble").setAttribute("disabled", "true");
})
