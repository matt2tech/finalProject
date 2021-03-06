// web worker for quicksort button
self.onmessage = function(event){
    switch(event.data.type){
        case "quicksort":
            start = performance.now();
            var array = quickSort(event.data.data);
            var time = performance.now() - start;
            timeArray.push(time);
            postMessage({array: array, time: time, timeArray: timeArray});
            break;
        default:
            console.log("Worker error on quicksort");
    }
    close();
}

var theArray = [5, 6, 4, 7, 3, 8, 2, 9, 1, 10]
var timeArray = [];
var start;

// code for quicksort algorithm
function quickSort(array) {
    var less = [];
    var greater = [];

    if (array.length < 2) {
        timeArray.push(performance.now() - start);
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
        timeArray.push(performance.now() - start);
        return quickSort(less).concat([pivot], quickSort(greater));
    }
}
