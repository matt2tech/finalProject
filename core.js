function quickSort(array) {
    if (array.length < 2) {
        return array;
    }
    else {
        var pivot = array[Math.floor(array.length / 2)];
        var less = less(array, pivot);
        var greater = greater(array, pivot);

        return quickSort(less) + [pivot] + quickSort(greater);
    }
}

function less(array, pivot) {
    var list = []
    for(var i; i <= array.length; i++) {
        if (array[i] <= pivot) {
            list.push(array[i]);
        }
        else {
            continue;
        }
    }
}

function greater(array, pivot) {
    var list = []
    for(var i; i <= array.length; i++) {
        if (array[i] >= pivot) {
            list.push(array[i]);
        }
        else {
            continue;
        }
    }
}

var array = [10, 5, 2, 3];

console.log(quickSort(array));
