$(document).ready(function() {
    setClickEvents();
	$('#writings').css("display", "none");
	$('#media').css("display", "none");
	$('#about').css("display", "none");
});

function setClickEvents(){
	$("#projectTab").on("click", function(e){
		var id = $(this).attr('id')
		openProjects(id);
    });
	$("#writingTab").on("click", function(e){
		var id = $(this).attr('id')
		openWritings(id);
    });
	$("#mediaTab").on("click", function(e){
		var id = $(this).attr('id')
		openMedia(id);
    });
	$("#aboutTab").on("click", function(e){
		var id = $(this).attr('id')
		openAbout(id);
    });
}

function openProjects(id){
	tabHighlight(id);
	tabChange("projects");
}

function openWritings(id){
	tabHighlight(id);
	tabChange("writings");
}

function openMedia(id){
	tabHighlight(id);
	tabChange("media");
}

function openAbout(id){
	tabHighlight(id);
	tabChange("about");
}

function tabHighlight(id) {
	$("#projectTab").removeClass("selected");
	$("#writingTab").removeClass("selected");
	$("#mediaTab").removeClass("selected");
	$("#aboutTab").removeClass("selected");
	$("#" + id).addClass("selected");
}

function tabChange(id) {
	$('#projects').css("display", "none");
	$('#writings').css("display", "none");
	$('#media').css("display", "none");
	$('#about').css("display", "none");
	$('#' + id).css("display", "");
}

/*    $(".cell").on("click", function(e){
        e.preventDefault();
        var id = $(this).attr('id');
        var cellID = $('#' + id).data("cell").location;
        if (e.shiftKey) {
            cells[cellID].alive = true;
            cells[cellID].lived = true;
            $('#c' + cellID).css("background-color", "#12B825");
        } else if (e.ctrlKey) {
            if (cells[cellID].lived)
                $('#c' + cellID).css("background-color", "#00556B");
            else
                $('#c' + cellID).css("background-color", "#003355");
            cells[cellID].alive = false;
        } else {
            cellClick($(this).attr('id'));
        }
        
    });
*/