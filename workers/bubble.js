self.onmessage = function(event){
    console.log("Hitting worker")
    switch(event.data.type){
        case "bubblesort":
            var start = performance.now()
            var array = bubbleSort(event.data.data)
            var time = performance.now() - start
            postMessage({array: array, time: time})
            break;
        default:
            console.log("Worker error on bubblesort")
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
