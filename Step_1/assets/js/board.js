//Grid layout / Creating the board

// Board class

class Board {
    constructor(grid_nb){
        this.nb_grids = grid_nb;
        this.map = [];
        this.weaponsStore = {};
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
                    element: null,
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


    //to place a block element on a spacified coordinate
    placeBlockElement(row, col, element){
        //also need to check if weapons/players are not placed
        if (this.map[row][col].element != true){
            this.map[row][col].block = true;
            this.map[row][col].element = true;  
            $("#grid_"+row+"_"+col+"").css('background-image', 'url(' + element + ')');
        }
        else {
           this.placeBlockElement(theBoard.randomRAC(), theBoard.randomRAC(), element);  
        }
    }
    
    //to place a weapon element on a spacified coordinate
    placeWeaponElement(row, col, element, key){
        //also need to check if weapons/players are not placed
        if (this.map[row][col].element != true){
            this.map[row][col].weapon = true;
            this.map[row][col].weaponName = '';//something
            this.map[row][col].element = true;  
            //please update weapon store
            this.weaponsStore[key].position = {row: row, col: col};
            $("#grid_"+row+"_"+col+"").css('background-image', 'url(' + element + ')');
        }
        else {
           this.placeWeaponElement(theBoard.randomRAC(), theBoard.randomRAC(), element, key)   
        }
    }
	
	placePlayerElement(row, col, element, key){
        //also need to check if weapons/players are not placed
        if (this.map[row][col].element != true){
            this.map[row][col].palyer = true;
            this.map[row][col].playerName = key;//something
            this.map[row][col].element = true;  
            //please update weapon store
			let player = this.playerStore.find((player) => player.name == key)
            player.position = {row: row, col: col};
            $("#grid_"+row+"_"+col+"").css('background-image', 'url(' + element + ')');
        }
        else {
           this.placePlayerElement(theBoard.randomRAC(), theBoard.randomRAC(), element, key)   
        }
    }
    
    

 createWeaponsStore = () => {
        //update waeponsStore to have  multiple  key with values as objects. the name of the keys will be weapon names. the values   will hold details of the weapon
        // like attack, defend Initially set them to null
   
    
    this.weaponsStore = {
        knife: {
            position: {row: null, col: null},
            damage: 5,
            image: 'assets/img/weapons/knife.PNG'
        },
        gun: {
            position: {row: null, col: null},
            damage: 50,
            image: 'assets/img/weapons/gun.PNG'
        },    
        axe: {
            position: {row: null, col: null},
            damage: 40,
            image: 'assets/img/weapons/axe.PNG'
        },
        swords: {
            position: {row: null, col: null},
            damage: 20,
            image: 'assets/img/weapons/sword.PNG'
        },
        fork: {
            position: {row: null, col: null},
            damage: 20,
            image: 'assets/img/weapons/fork.PNG'
        },
    }
 }
    createPlayerStore = () => {
        //update playerStore to have two key with values as objects. those will hold details of the player
        // like player attack, defend, position etc. Initially set them to null
		
		this.playerStore = [{
		   name: 'Player1', 
		   image: 'assets/img/players/player1.png',
		   position: {row: null, col: null},
		},
		{
		   name: 'Player2', 
		   image: 'assets/img/players/player2.png',
		   position: {row: null, col: null},
		},
		]
    }
}


//The main
// On page load function
$(document).ready(function() {

    //initializing the Board class
    theBoard = new Board(10);
    theBoard.createGrid();

   theBoard.createWeaponsStore(); //Calling the Weapon store function in my class
   console.log(theBoard.weaponsStore);
   //Looping to display weapons on map 
   for (var weapon in theBoard.weaponsStore){
       theBoard.placeWeaponElement(theBoard.randomRAC(), theBoard.randomRAC(), theBoard.weaponsStore[weapon].image, weapon); 
   }  
   
   theBoard.createPlayerStore(); //Calling the Player store in my class
   theBoard.playerStore.forEach(player => {
	  theBoard.placePlayerElement(theBoard.randomRAC(), theBoard.randomRAC(), player.image, player.name); 
   })
    
    for(var i = 1; i<=7; i++){
        theBoard.placeBlockElement(theBoard.randomRAC(), theBoard.randomRAC(), 'assets/img/wall.png');
    }

//Event listener for my map
   $('#container').click((e) => {
    e.preventDefault();
    let elementId = e.target.id
    let clickedRow = elementId.split('_')[1]
    let clickedColumn = elementId.split('_')[2]
	console.log(`Row is ${clickedRow}, Column is ${clickedColumn}`)
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
