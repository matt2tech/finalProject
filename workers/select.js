// web worker for select button
self.onmessage = function(event){
    console.log("Starting select sort worker");
    switch(event.data.type){
        case "selectsort":
            var array = selectionSort(event.data.data);
            var time = performance.now() - start;
            postMessage({array: array, time: time});
            console.log("Ending select sort worker");
            console.log("Select Time length: " + timeArray.length);
            break;
        default:
            console.log("Worker error on select sort");
    }
    close();
}

var timeArray = [];
var start;

// code for selection sort algorithm
function selectionSort(array) {
    start = performance.now();
    for(var i = 0; i < array.length; i++) {
      var min = i;
      for(var x = i + 1; x < array.length; x++) {
        if(array[x] < array[min]) {
          min = x;
        } else {
            continue
        }
      }
      if(i !== min) {
        var temp = array[i];
        array[i] = array[min];
        array[min] = temp;
        timeArray.push(performance.now() - start);
      } else {
          timeArray.push(performance.now() - start);
          continue;
      }
    }
    return array;
  }
