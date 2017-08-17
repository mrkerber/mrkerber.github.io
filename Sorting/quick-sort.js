var data;

function quickSort() {
  showAnimation = 3;

  data = $("#current-data").html().split(",").map(Number);
  setGraphParameters(data);
  console.log(recursiveSort(data, 0, data.length - 1));
}

function recursiveSort(data, lo, hi) {
  setTimeout(function() {
    if (lo < hi) {
      p = partition(data, lo, hi);
      recursiveSort(data, lo, p - 1);
      recursiveSort(data, p + 1, hi);
    }
    return data;
  }, 0)
}

function partition(data, lo, hi) {

  var pivot = data[hi];
  var min = lo - 1;

  for (var i = lo; i < hi; i++) {
    if (data[i] <= pivot) {
      min++;
      [data[i], data[min]] = [data[min], data[i]];
    }
  }

  [data[hi], data[min + 1]] = [data[min + 1], data[hi]];
  if(showAnimation == 3) {
    generateGraph(data);
  }
  return min + 1;
}

/*

function recursiveSort(data, lo, hi) {
  if (lo < hi) {
    p = partition(data, lo, hi);
    recursiveSort(data, lo, p - 1);
    recursiveSort(data, p + 1, hi);
  }
  return data;
}

function partition(data, lo, hi) {

  var pivot = data[hi];
  var min = lo - 1;

  for (var i = lo; i < hi; i++) {
    if (data[i] <= pivot) {
      min++;
      [data[i], data[min]] = [data[min], data[i]];
    }
  }

  [data[hi], data[min + 1]] = [data[min + 1], data[hi]];
  //generateGraph(data);
  return min + 1;
}

*/




//Do a median of 3
function createPivot(input) {
  var pivot;

  var lo = input[0];
  var hi = input[(input.length - 1)];
  var mid = input[(input.length / 2)];

  return pivot;
}
