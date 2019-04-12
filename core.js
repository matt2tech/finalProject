function quickSort(array) {
    var final = [];
    var less = [];
    var greater = [];

    if (array.length < 2) {
        return array;
    } else {
        var pivot = array[0];

        // var less = array[1:].filter(x => (x <= pivot)).map(x => x)
        // var greater = array.filter(x => (x > pivot)).map(x => x)

        for(var i = 1; i < array.length; i++) {
            if (array[i] <= pivot) {
                less.push(array[i])
            } else {
                greater.push(array[i])
            }
        }

        // var less = lessSort(array, pivot);
        console.log("Less: " + less);
        // var greater = greaterSort(array, pivot);
        console.log("Greater: " + greater);

        // final.push(quickSort(less));
        // final.push(pivot);
        // final.push(quickSort(greater));
        return quickSort(less).concat([pivot].concat(quickSort(greater)));
    }
}

function lessSort(array, pivot) {
    var list = [];
    if (array.length < 2) {
        return list;
    } else {
        for (var i = 1; i <= array.length; i++) {
            if (array[i] <= pivot) {
                list.push(array[i]);
            } else {
                continue;
            }
        }
        return list;
    }
}

function greaterSort(array, pivot) {
    var list = [];
    if (array.length < 2) {
        return list;
    } else {
        for (var i = 1; i <= array.length; i++) {
            if (array[i] > pivot) {
                list.push(array[i]);
            } else {
                continue;
            }
        }
        return list;
    }
}

var array = [10, 5, 2, 3];

console.log("end result: " + quickSort(array));
