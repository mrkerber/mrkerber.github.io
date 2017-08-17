function cell(location){
    this.location = location;
    this.alive = false;
    this.lived = false;
    this.aliveNeighbors = 0;
}

// Control Variables 
var cols = 20;
var rows = 20;
var radius = 1;
var delay = 100;
var lonely = 2;
var overPop = 4;
var genMin = 3;
var genMax = 3;
var allDead = true;
var allToroidal = false;

var size = 28;
var cells = [];
var sim = "#display";

var running = false;
var borders = true;

$(sim).ready(function() {
    build();
});

function alwaysDead(){
    allDead = true;
    allToroidal =  false;
}

function setGenMin(g){
    $("#genmin").html(g);
    genMin = g;
}

function setGenMax(g){
    $("#genmax").html(g);
    genMax = g;
}

function setLonliness(l){
    $("#lonely").html(l);
    lonely = l;
}

function setOverpopulation(o){
    $("#overpop").html(o);
    overPop = o;
}

function alwaysAlive(){
    allDead = false;
    allToroidal =  false;
}

function alwaysToroidal(){
    allDead = true;
    allToroidal = true;
}

function setDimension(dim){
    $("#size").html(dim + "x" + dim);
    size = Math.floor((600-dim)/dim);
    if (size<5){
        size = Math.floor(600/dim);
        borders = false;
    }
    else
        borders = true;
    cols = dim;
    rows = dim;
    refresh();
}

function setDelay(del){
    $("#delay").html(del);
    delay = del;
}

function setRadius(r){
    $("#radius").html(r);
    radius = r;
    refresh();
}

function randomize(){
    reset();
    var rand;
    for (var i = 0; i < rows*cols; i++){
        rand = Math.round(Math.random());
        if (rand == 0)
            cells[i].alive = false;
        else{
            cells[i].alive = true;
            cells[i].lived = true;
        }
        lifeProtocol(i);
    }
}

function refresh(){
    $(sim).html("");
    cells = [];
    build();
    setClickEvents();
}

function reset(){
    refresh();
    /*    running = false;
    running = false;
    for (var i = 0; i < rows*cols; i++) {
        cells[i].alive = false;
        cells[i].lived = false;
        cells[i].aliveNeighbors = 0;
        $('#c' + i).css("background-color", "#003355");
    } */
}

function setClickEvents(){
    $(".cell").on("click", function(e){
        e.preventDefault();
        var id = $(this).attr('id');
        var cellID = $('#' + id).data("cell").location;
        if (e.shiftKey) {
            cells[cellID].alive = true;
            cells[cellID].lived = true;
            $('#c' + cellID).css("background-color", "#FFC77A");
        } else if (e.ctrlKey) {
            if (cells[cellID].lived)
                $('#c' + cellID).css("background-color", "#D1E1FF");
            else
                $('#c' + cellID).css("background-color", "#003355");
            cells[cellID].alive = false;
        } else {
            cellClick($(this).attr('id'));
        }

    });
}

function build(){
    var count = 0;

    for(var x = 0; x < rows; x++){
        for(var y = 0; y < cols; y++){
            if (!borders)
                $(sim).append('<div class="cell" id="c' + (count) + '" style="border:none; width:' + size + 'px; height:' + size + 'px;"></div>');
            else
                $(sim).append('<div class="cell" id="c' + (count) + '" style="width:' + size + 'px; height:' + size + 'px;"></div>');
            cells[count] = new cell(count);
            count++;
        }
        $(sim).append('<div class="clear"></div>');
    }
    count = 0;
    for(var i = 0; i < rows*cols; i++){
        $('#c' + i).data("cell", cells[i]);
    }
}

$(document).ready(function() {
    setClickEvents();
});

function startClick(){
    if (!running){
        running = true;
        run();
    }
}

function run() {
    if (running)
        setTimeout(function(){age(); run();}, delay);
}

function stop(){
    running = false;
}

function cellClick(id){
    $("#cellClicked").html(id);
    var cellID = $('#' + id).data("cell").location;
    if (cells[cellID].alive == false){
        cells[cellID].alive = true;
        cells[cellID].lived = true;
        $('#c' + cellID).css("background-color", "#FFC77A");
    }
    else {
        cells[cellID].alive = false;
        $('#c' + cellID).css("background-color", "#D1E1FF");
    }
}

// Sets cell color according to status of life
function lifeProtocol(cellID){
    if (cells[cellID].alive)
        $('#c' + cellID).css("background-color", "#FFC77A");
    else
        $('#c' + cellID).css("background-color", "#D1E1FF");
}

function stepClick() {
    if (running == false) {
        age();
    }
}

function age() {
    var aliveCount = 0;
    for (var count = 0; count < cols*rows; count++) {

            //Above cell
            for(var h = radius; h > 0; h--){
                var currentRow = ((count - (count%cols)) / rows) - h;
                var minCell = currentRow * cols;
                var maxCell = minCell + cols -1;
                for(var i = (count-(cols*h)-radius); i <= (count-(cols*h)+radius); i++){
                    if (allDead) {
                        if ((i >= 0) && (i >= minCell) && (i <= maxCell)) {
                            if (cells[i] != undefined) {
                                if(cells[i].alive)
                                    aliveCount++;
                            }
                        }
                    } else {
                        if (i < 0 || i < minCell || i > maxCell)
                            aliveCount++;
                        if (cells[i] != undefined) {
                            if (cells[i].alive)
                                aliveCount++;
                        }
                    }
                }
            }

            //Same row as cell
            var currentRow = ((count - (count%cols)) / rows);
            var minCell = currentRow * cols;
            var maxCell = minCell + cols -1;
            for(var i = (count-radius); i <= (count+radius); i++){
                if (allDead) {
                    if ((i >= 0) && (i >= minCell) && (i <= maxCell) && (i != count)) {
                        if (cells[i] != undefined) {
                            if(cells[i].alive)
                                aliveCount++;
                        }
                    }
                } else {
                    if (i < 0 || i < minCell || i > maxCell)
                        aliveCount++;
                    if (cells[i] != undefined) {
                            if (cells[i].alive)
                                aliveCount++;
                    }
                }
            }

            //Below cell
            for(var h = radius; h > 0; h--){
                var currentRow = ((count - (count%cols)) / rows) + h;
                var minCell = currentRow * cols;
                var maxCell = minCell + cols -1;
                for(var i = (count+(cols*h)-radius); i <= (count+(cols*h)+radius); i++){
                    if (allDead) {
                        if ((i <= cols*rows) && (i >= minCell) && (i <= maxCell)) {
                            if (cells[i] != undefined) {
                                if(cells[i].alive)
                                    aliveCount++;
                            }
                        }
                    } else {
                        if (i > cols*rows || i < minCell || i > maxCell)
                            aliveCount++;
                        if (cells[i] != undefined) {
                            if (cells[i].alive)
                                aliveCount++;
                        }
                    }
                }
            }

            cells[count].aliveNeighbors = aliveCount;
            aliveCount = 0;
    }



    //Update Grid
    for(count = 0; count < cols*rows; count++){
        aliveCount = cells[count].aliveNeighbors;
        //alert("cell: " + count + " neighbors: " + cells[count].aliveNeighbors);
        if ((aliveCount < lonely || aliveCount >= overPop) && cells[count].alive){
            cells[count].alive = false;
            lifeProtocol(count);
        }
        if (aliveCount >= genMin && aliveCount <= genMax && !cells[count].alive){
            cells[count].alive = true;
            lifeProtocol(count);
        }
    }
}
