//Grid layout 

// function that builds a grid in the "container"
function createGrid(x) {
    
    for (var rows = 0; rows < x; rows++) {
        for (var columns = 0; columns < x; columns++) {
            $("#container").append("<div class='grid'> X= "+columns+", "+rows+"</div>");
             
             console.log("Columns = "+columns);
             console.log("Rows = "+rows);
             
        };
       
    };
    $(".grid").width(660/x);
    $(".grid").height(660/x);
    
};



// create a 16x16 grid when the page loads
$(document).ready(function() {
    createGrid(10);


});
