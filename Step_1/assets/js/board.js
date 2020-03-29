//Grid layout / Creating the board

// Board class

class Board {
    constructor(grid_nb){
        this.nb_grids = grid_nb;
    }
    // Function to create the grid
    createGrid(){
        for (var rows = 0; rows < this.nb_grids; rows++) {
            for (var columns = 0; columns < this.nb_grids; columns++) {
                $("#container").append('<div id="grid_'+columns+'_'+rows+'" class="grid"></div>');
                 /*
                 console.log("Columns = "+columns);
                 console.log("Rows = "+rows);
                 */
                 
            };
           
        };
        $(".grid").width(760/this.nb_grids);
        $(".grid").height(760/this.nb_grids);
    }

    randomRAC() {
        let genNumber = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
        return genNumber;
    }

    //to place an alement on a spacified coordinate
    placeElement(row, col, element){
    $("#grid_"+row+"_"+col+"").css('background-image', 'url(' + element + ')');

    }

}


// create a 16x16 grid when the page loads
$(document).ready(function() {

    theBoard = new Board(10);
    theBoard.createGrid();

   let row = theBoard.randomRAC();
   let column = theBoard.randomRAC();
   console.log(row);
   console.log(column);

   theBoard.placeElement(row, column, 'assets/img/wall.png');








   
   /*
   //Test randome display
   let rowPlayer1 = theBoard.randomRAC();
   let columnPlayer1 = theBoard.randomRAC();
   
   let rowPlayer2 = theBoard.randomRAC();
   let columnPlayer2 = theBoard.randomRAC();
   theBoard.placeElement(rowPlayer1, columnPlayer1, 'assets/img/player1.png');
   theBoard.placeElement(rowPlayer2, columnPlayer2, 'assets/img/player2.png');
*/


    /*
    let imageUrl = 'assets/img/wall.png';
    $("#grid_4_5").css('background-image', 'url(' + imageUrl + ')');
    */

});
