//Data Values
var randomData = [];
var dataSize = 50;
var dataRange = 50;

//Graph Values
var barWidth;
var barMaxHeight;

//Control Variables;
var showAnimation = 0;
/*
  0 = new data, no animation
  1 = selection sort
  2 = merge sort
  3 = quicksort
*/

function createData() {
  showAnimation = 0;
  randomData = [];
  for(var i = 0; i < dataSize; i++) {
    randomData.push(Math.floor(Math.random() * dataRange));
  }
  $("#current-data").html(randomData.toString());
  setGraphParameters(randomData);
  generateGraph(randomData);
}

function setDataValues(size) {
  dataSize = size;
  dataRange = size;
  $("#dataset").html("" + size);
}

function setGraphParameters(input) {
  barWidth = 1000 / dataSize;
  barMultiplier = 500 / dataRange;
}

function generateGraph(input) {
  $("#graph").html(" ");
  var barHeight = 1;
  var color = 'red';

  for(var i = 0; i < input.length; i++) {
    barHeight = input[i];
    if (barHeight < (dataSize / 10)){
      color = '#151';
    } else if (barHeight < (dataSize / 10) * 2){
      color = '#363';
    } else if (barHeight < (dataSize / 10) * 3){
      color = '#474';
    } else if (barHeight < (dataSize / 10) * 4){
      color = '#686';
    } else if (barHeight < (dataSize / 10) * 5){
      color = '#797';
    } else if (barHeight < (dataSize / 10) * 6){
      color = '#8A8';
    } else if (barHeight < (dataSize / 10) * 7){
      color = '#9B9';
    } else if (barHeight < (dataSize / 10) * 8){
      color = '#ACA';
    } else if (barHeight < (dataSize / 10) * 9){
      color = '#BDB';
    } else {
      color = '#CFC';
    }

    if (barHeight == 0)
      $("#graph").append('<div class="bar" style="height:' + (1) + 'px;width:' + barWidth + 'px;"></div>');
    else
      $("#graph").append('<div class="bar" style="height:' + (barHeight * barMultiplier) + 'px;width:' + barWidth + 'px;background-color:' + color + ';"></div>')
  }
}
