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

var array = [10, 5, 2, 3];

var arrayLength = Math.ceil(Math.random() * 10000);

var array = arrayBuild(arrayLength)

console.log("Length: " + arrayLength);
console.log("Array: " + array);

var start = performance.now();
var qSort = quickSort(array);
var end = performance.now();

console.log("Time: " + (end - start) + " milliseconds")
console.log("Quicksort: " + qSort);
