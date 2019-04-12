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

function arrayBuild(length) {
    array = []
    for(var i = 0; i < length; i++) {
        array.push(Math.ceil(Math.random() * length))
    }
    return array
}

document.getElementById("quick").addEventListener("click", function() {
    var length = document.getElementById("length").value
    arrayBuild(length)

    var array = arrayBuild(length)
    console.log("Array: " + array);

    var start = performance.now();
    var qSort = quickSort(array);
    var end = performance.now();

    console.log("Quicksort: " + qSort);

    var quickPerform = document.getElementById("quicksort")
    quickPerform.innerText = "Length: " + length + " indices" + "\nTime: " + (end - start) + " milliseconds"; 
})

// var arrayLength = Math.ceil(Math.random() * 100000);

// var array = arrayBuild(arrayLength)
// console.log("Array: " + array);

// var start = performance.now();
// var qSort = quickSort(array);
// var end = performance.now();

// console.log("Quicksort: " + qSort);

// var quickPerform = document.getElementById("quicksort")
// quickPerform.innerText = "Length: " + arrayLength + " indices" + "\nTime: " + (end - start) + " milliseconds"; 
