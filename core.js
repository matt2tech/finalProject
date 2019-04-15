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
                less.push(array[i])
            } else {
                greater.push(array[i])
            }
        }
        return quickSort(less).concat([pivot].concat(quickSort(greater)));
    }
}

// builds array
function arrayBuild(length) {
    array = []
    for(var i = 0; i < length; i++) {
        array.push(Math.ceil(Math.random() * length))
    }
    return array
}

// listens to build button to run arrayBuild function
document.getElementById("build").addEventListener("click", function() {
    var length = document.getElementById("length").value;
    globalArray = arrayBuild(length);

    console.log("Array: " + globalArray);

    document.getElementById("build").setAttribute("disabled", "true");
})

// listens to quick button and runs quicksort function
document.getElementById("quick").addEventListener("click", function() {
    var start = performance.now();
    var qSort = quickSort(globalArray);
    var end = performance.now();

    console.log("Quicksort: " + qSort);

    var quickPerform = document.getElementById("quicksort")
    quickPerform.innerText = "Length: " + length + " indices" + "\nTime: " + (end - start) + " milliseconds"; 
})
