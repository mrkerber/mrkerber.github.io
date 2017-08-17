//Add timer to show elapsed time during sort

function selectionSort() {
  showAnimation = 1;

  data = $("#current-data").html().split(",").map(Number);
  setGraphParameters(data);

  var length = data.length;
  var counter = 0;
  var position = 0;
  var replacement;
  var min = data[0];

  function iterate() {
    setTimeout(function() {
      position = counter;
      min = data[counter];

      for(var i = counter; i < length; i++) {
        if(data[i] < min) {
          min = data[i];
          position = i;
        }
      }

      replacement = data[counter];
      data[counter++] = min;
      data[position] = replacement;
      position = counter;
      if (showAnimation == 1) {
        generateGraph(data);
      }
      if(counter < length) {
        iterate();
      }
    }, 0);
  }

  iterate();

  return data;
}


/*

function selectionSort() {

  data = $("#current-data").html().split(",").map(Number);
  setGraphParameters(data);

  var length = data.length;
  var counter = 0;
  var position = 0;
  var replacement;
  var min = data[0];

  while(counter < length) {
    position = counter;
    min = data[counter];

    for(var i = counter; i < length; i++) {
      if(data[i] < min) {
        min = data[i];
        position = i;
      }

    }

    replacement = data[counter];
    data[counter++] = min;
    data[position] = replacement;
    position = counter;
    //setTimeout(function(){generateGraph(data)}, 1000);
  }

  return data;
}

*/
