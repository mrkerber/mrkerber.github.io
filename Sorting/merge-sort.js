
var data;

function mergeSort() {

  data = $("#current-data").html().split(",").map(Number);

  console.log(recursiveSplit(data));

}

function recursiveSplit(input) {

  var length = input.length;

  if (length < 2)
    return input;

  var midpoint = length / 2;
  var left = input.slice(0, midpoint);
  var right = input.slice(midpoint, length);

  return merge(recursiveSplit(left), recursiveSplit(right));
}

function merge(left, right) {

  var output = [];

  var lIndex = 0;
  var rIndex = 0;
  var lLength = left.length;
  var rLength = right.length;

  while((lIndex < lLength) && (rIndex < rLength)) {
    if (left[lIndex] <= right[rIndex]){
      output.push(left[lIndex]);
      lIndex++;
    } else {
      output.push(right[rIndex]);
      rIndex++;
    }
  }

  while (lIndex < lLength) {
    output.push(left[lIndex])
    lIndex++;
  }

  while (rIndex < rLength) {
    output.push(right[rIndex])
    rIndex++;
  }
  setTimeout(function() {
    generateGraph(output);
  }, 10);
  return output;
}

/*


var data;

function mergeSort() {

  data = $("#current-data").html().split(",").map(Number);

  console.log(recursiveSplit(data));

}

function recursiveSplit(input) {

  var length = input.length;

  if (length < 2)
    return input;

  var midpoint = length / 2;
  var left = input.slice(0, midpoint);
  var right = input.slice(midpoint, length);

  return merge(recursiveSplit(left), recursiveSplit(right));

}

function merge(left, right) {

  var output = [];

  var lIndex = 0;
  var rIndex = 0;
  var lLength = left.length;
  var rLength = right.length;

  while((lIndex < lLength) && (rIndex < rLength)) {
    if (left[lIndex] <= right[rIndex]){
      output.push(left[lIndex]);
      lIndex++;
    } else {
      output.push(right[rIndex]);
      rIndex++;
    }
  }

  while (lIndex < lLength) {
    output.push(left[lIndex])
    lIndex++;
  }

  while (rIndex < rLength) {
    output.push(right[rIndex])
    rIndex++;
  }
  generateGraph(output);
  return output;
}
*/
