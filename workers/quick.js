// web worker for quicksort button
self.onmessage = function(event){
    console.log("Starting quicksort worker");
    switch(event.data.type){
        case "quicksort":
            var start = performance.now();
            var array = quickSort(event.data.data);
            var time = performance.now() - start;
            postMessage({array: array, time: time});
            console.log("Ending quicksort worker");
            break;
        default:
            console.log("Worker error on quicksort");
    }
    close();
}

// code for quicksort algorithm
function quickSort(array) {
    var less = [];
    var greater = [];

    if (array.length < 2) {
        return array;
    } else {
        var pivot = array[0];

        for(var i = 1; i < array.length; i++) {
            if (array[i] < pivot) {
                less.push(array[i]);
            } else {
                greater.push(array[i]);
            }
        }
        return quickSort(less).concat([pivot], quickSort(greater));
    }
}
