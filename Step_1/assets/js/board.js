//Grid layout / Creating the board

// Board class

class board {
    constructor(grid_nb){
        this.nb_grids = grid_nb;
    }
    // Function to create the grid
    createGrid(){
        for (var rows = 0; rows < this.nb_grids; rows++) {
            for (var columns = 0; columns < this.nb_grids; columns++) {
                $("#container").append("<div class='grid'> X= "+columns+",Y="+rows+"</div>");
                 
                
                 console.log("Columns = "+columns);
                 console.log("Rows = "+rows);
                 
            };
           
        };
        $(".grid").width(660/this.nb_grids);
        $(".grid").height(660/this.nb_grids);
    }
}


// create a 16x16 grid when the page loads
$(document).ready(function() {

    theBoard = new board(10);
    theBoard.createGrid();

});
