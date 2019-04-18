// web worker for select button
self.onmessage = function(event){
    console.log("Starting select sort worker");
    switch(event.data.type){
        case "selectsort":
            var array = selectionSort(event.data.data);
            var time = performance.now() - start;
            postMessage({array: array, time: time});
            console.log("Ending select sort worker");
            console.log("Select Time: " + timeArray.length);
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
        }
      }
      if(i !== min) {
        var temp = array[i];
        array[i] = array[x];
        array[x] = temp;
      } else {
          continue;
      }
      timeArray.push(performance.now() - start);
    }
    return array;
  }
