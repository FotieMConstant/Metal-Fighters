//Grid layout / Creating the board

// Board class

class Board {
    constructor(grid_nb){
        this.nb_grids = grid_nb;
        this.map = [];
        this.waeponsStore = {};
        this.playerStore = {};
        this.currentTurn = null;
    }
    // Function to create the grid
    createGrid(){
        for (var rows = 0; rows < this.nb_grids; rows++) {
            this.map[rows] = [];
            for (var columns = 0; columns < this.nb_grids; columns++) {
                $("#container").append('<div id="grid_'+columns+'_'+rows+'" class="grid"></div>');
                this.map[rows][columns] = {
                    block: null, 
                    player: null, 
                    playerName: '',
                    weapon: null,
                    weaponName: '',
                    movableFor: '', //store player name here
                }
                 /*
                 console.log("Columns = "+columns);
                 console.log("Rows = "+rows);
                 */
                 
            };
           
        };
        $(".grid").width(760/this.nb_grids);
        $(".grid").height(760/this.nb_grids);
        this.currentTurn = 'Player1'
    }

    randomRAC() {
        let genNumber = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
        return genNumber;
    }

    // Function to get cell position
    getPosition(rowPosition, colPosition) {
    return $(`div[data-col="${rowPosition}"][data-row="${colPosition}"]`)[0];
    }


    //to place an alement on a spacified coordinate
    placeElement(row, col, element, type){
        if (type == 'block'){
            this.map[row][col].block = true;
        }
        else if (type == 'weapon'){
           this.map[row][col].weapon = true;
           this.map[row][col].weaponName = ''; //name of weapon
       } 
       else if (type == 'player'){
           this.map[row][col].player = true;
           this.map[row][col].playerName = ''; //name of player
       } 
       $("#grid_"+row+"_"+col+"").css('background-image', 'url(' + element + ')');

    }
    

    createWeaponsStore = () => {
        //update waeponsStore to have  multiple  key with values as objects. the name of the keys will be weapon names. the values   will hold details of the weapon
        // like attack, defend Initially set them to null
       let  weapon = [
           {
            key: 'knife',
            position: null,
            damage: 5
          },
          {
            key: 'gun',
            position: null,
            damage: 50
          },
          {
            key: 'axe',
            position: null,
            damage: 40
          },
          {
            key: 'fork',
            position: null,
            damage: 30
          },
           {
            key: 'swords',
            position: null,
            damage: 20
          },
        ];
    }
    createPlayerStore = () => {
        //update playerStore to have two key with values as objects. those will hold details of the player
        // like player attack, defend, position etc. Initially set them to null
    }

}



// On page load function
$(document).ready(function() {

    theBoard = new Board(10);
    theBoard.createGrid();

   let row = theBoard.randomRAC();
   let column = theBoard.randomRAC();
   theBoard.createWeaponsStore(); 
   theBoard.createPlayerStore();

    
    function placeWall(){
        const colPosition = theBoard.randomRAC();
        const rowPosition = theBoard.randomRAC();
        const position = {
            col: colPosition,
            row: rowPosition,
         }
    theBoard.placeElement(position.row, position.col, 'assets/img/wall.png', 'block');
}
//Calling for  the place wall function
 placeWall();
 


   $('#container').click((e) => {
    e.preventDefault();
    let elementId = e.target.id
    let clickedRow = elementId.split['_'][1]
    let clickedColumn = elementId.split['_'][2]
})

   
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
