// web worker for bubblesort button
self.onmessage = function(event){
    console.log("Starting bubblesort worker");
    switch(event.data.type){
        case "bubblesort":
            var array = bubbleSort(event.data.data);
            var time = performance.now() - start;
            postMessage({array: array, time: time});
            console.log("Ending bubblesort worker");
            console.log("Bubble Time length: " + timeArray.length)
            break;
        default:
            console.log("Worker error on bubblesort");
    }
    close();
}

var timeArray = [];
var start;

// code for bubble sort algorithm
function bubbleSort(array) {
    start = performance.now();
    for(var i = 0; i < array.length; i++) {
        for(var x = 0; x < array.length; x++) {
            if(array[x] > array[x+1]) {
                temp = array[x];
                array[x] = array[x+1]
                array[x+1] = temp
            } else {
                continue;
            }
        }
        timeArray.push(performance.now() - start);
    }
    return array
}
