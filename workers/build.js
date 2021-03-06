// web worker for build button
self.onmessage = function(event){
    switch(event.data.type){
        case "build":
            var array = arrayBuild(event.data.data);
            postMessage({array: array});
            break;
        default:
            console.log("Worker error on build");
    }
    close();
}

// builds array
function arrayBuild(length) {
    array = [];
    for (var i = 0; i < length; i++) {
        array.push(Math.ceil(Math.random() * length));
    }
    return array;
}
