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
                $("#container").append('<div id="grid_'+rows+'_'+columns+'" class="grid"></div>');
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
            this.map[row][col].weaponName = key;//something
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
        //check each position and check if there's a player beside

        // if (this.map[row+1][col].player == true){
        //     this.placePlayerElement(theBoard.randomRAC(), theBoard.randomRAC(), element, key);
        // }
        // else if (this.map[row-1][col].player == true) {
        //     this.placePlayerElement(theBoard.randomRAC(), theBoard.randomRAC(), element, key);
        // }
        // else if (this.map[row][col+1].player == true) {
        //     this.placePlayerElement(theBoard.randomRAC(), theBoard.randomRAC(), element, key);
        // }
        // else if (this.map[row][col-1].player == true) {
        //     this.placePlayerElement(theBoard.randomRAC(), theBoard.randomRAC(), element, key);
        // }
        // else if (this.map[row][col+1].player == true) {
        //     this.placePlayerElement(theBoard.randomRAC(), theBoard.randomRAC(), element, key);
        // }
        if (this.map[row][col].element != true){
            this.map[row][col].player = true;
            this.map[row][col].playerName = key;//something
            this.map[row][col].element = true;  
            console.log(this.map);// Printing the map in a 2D array
            //please update player store
			let player = this.playerStore.find((player) => player.name == key);
            player.position = {row: row, col: col};
            console.log(player.name+" has attack "+player.attack);
            $("#grid_"+row+"_"+col+"").css("background-color",""); // Initialize the background to null
            $("#grid_"+row+"_"+col).css("box-shadow",""); // In case there's a weapon also set the box-shadow to null (When player crosses weapon)
            $("#grid_"+row+"_"+col+"").css('background-image', 'url(' + element + ')');
        }
        else {
            //This if is for when the player is in movement and falls on a weapon
            if(this.map[row][col].weapon){
                this.map[row][col].player = true;
                this.map[row][col].playerName = key;//something
                // this.map[row][col].element = true;
                // this.map[row][col].weapon = true;
                console.log(this.map);// Printing the map in a 2D array

                //please update player store
                let player = this.playerStore.find((player) => player.name == key);
                player.position = {row: row, col: col};


                console.log("---> You just walked on a weapon!");        
               
                let weaponImg;// To store the damage's image
                //Looping to get the weapon damages from the weapon store
                //To update the player's attack
              for(let weapon in this.weaponsStore){
                  if(weapon == this.map[row][col].weaponName){
                    player.attack = this.weaponsStore[weapon].damage;
                    weaponImg = this.weaponsStore[weapon].image;
                    break;
                  }
              }
            
              console.log(player.name+" has picked new attack "+player.attack);
              
              //Updating the ui with the new weapon picked
              if (player.name == "Player1") {
                  $(".attack-power-player1").text(player.attack);
                  $(".attack-weapon-player1").css('background-image', 'url(' + weaponImg + ')');
              }else if(player.name == "Player2"){
                $(".attack-power-player2").text(player.attack);
                $(".attack-weapon-player2").css('background-image', 'url(' + weaponImg + ')');
              }


                $("#grid_"+row+"_"+col+"").css("background-color",""); // Initialize the background to null
                $("#grid_"+row+"_"+col).css("box-shadow",""); // In case there's a weapon also set the box-shadow to null (When player crosses weapon)
                $("#grid_"+row+"_"+col+"").css('background-image', 'url(' + element + ')');
            }else{
            this.placePlayerElement(theBoard.randomRAC(), theBoard.randomRAC(), element, key);  
            }
        }
    }
    
    

 createWeaponsStore = () => {
        //update waeponsStore to have  multiple  key with values as objects. the name of the keys will be weapon names. the values   will hold details of the weapon
        // like attack, defend Initially set them to null
    this.weaponsStore = {
        knife: {
            position: {row: null, col: null},
            damage: 30,
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
            damage: 10,
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
           attack: 10,
		   position: {row: null, col: null},
		},
		{
           name: 'Player2',
           attack: 10, 
		   image: 'assets/img/players/player2.png',
		   position: {row: null, col: null},
		},
		]
    }

    //Display up moves
    PossibleMoveUp(){
       
        
       let currentPlayer = this.playerStore.find((playerObj) => {return playerObj.name == this.currentTurn })

       let row = currentPlayer.position.row;
       let col = currentPlayer.position.col;
     
        
       if (this.map[row][col].player == true){


        //Looping to display movable spots
        for(let i = 1; i <= 3; i++){
            row = row-1; // Reducing the value of row because up means minus but on the same col
            if(row < 0){
                break;//Break loop if we are out of the map, that is less than 0
            }
            // If there's a block or player in the grid, i break
            if(this.map[row][col].block == true || this.map[row][col].player == true){
                    break;
                }
                if(this.map[row][col].weapon != true){
                 //If there's no weapon i highlight the box
                 this.map[row][col].movable = true;
                    $("#grid_"+row+"_"+col).css("background","#fcf75e");
                }else{
                    //If there's a weapon on the way i apply special css
                    this.map[row][col].movable = true;
                $("#grid_"+row+"_"+col).css("box-shadow","inset 0 0 0 2000px rgba(243, 255, 67, 0.3)");
               
                }  
        }
       }
       
    }

 //Display up moves
 PossibleMoveDown(){

    let currentPlayer = this.playerStore.find((playerObj) => {return playerObj.name == this.currentTurn })

    let row = currentPlayer.position.row;
    let col = currentPlayer.position.col;

    if (this.map[row][col].player == true){

     //Looping to display movable spots
     for(let i = 1; i <= 3; i++){
         row = row+1; //Increasing the value of rows because down mean plus but on the same col
         if(row >= 10){
             break;//Break loop if we move out of the map that is, more than or equal to 10
         }
         // If there's a block or player in the grid, i break
         if(this.map[row][col].block == true || this.map[row][col].player == true){
                 break;
             }
             if(this.map[row][col].weapon != true){
                 //If there's no weapon i highlight the box
                 this.map[row][col].movable = true;
                 $("#grid_"+row+"_"+col).css("background","#fcf75e");
             }else{
              //If there's a weapon on the way i apply special css
              this.map[row][col].movable = true;
             $("#grid_"+row+"_"+col).css("box-shadow","inset 0 0 0 2000px rgba(243, 255, 67, 0.3)");
            
             }  
     }
    }
     
 }


 //Display up moves
 PossibleMoveLeft(){
    
    let currentPlayer = this.playerStore.find((playerObj) => {return playerObj.name == this.currentTurn })

    let row = currentPlayer.position.row;
    let col = currentPlayer.position.col;

    if (this.map[row][col].player == true){

     //Looping to display movable spots
     for(let i = 1; i <= 3; i++){
         col = col-1; //Reducing instead the value of col here because, Left means minus col but on the same row
         if(col < 0){
             break;//Break if col is less than 0, that is goes out of the map
         }
         // If there's a block or player in the grid, i break
         if(this.map[row][col].block == true || this.map[row][col].player == true){
                 break;
             }
             //If there's no weapon i highlight the box
             if(this.map[row][col].weapon != true){
                this.map[row][col].movable = true;
                 $("#grid_"+row+"_"+col).css("background","#fcf75e");
             }else{
                 //If there's a weapon on the way i apply special css
                 this.map[row][col].movable = true;
             $("#grid_"+row+"_"+col).css("box-shadow","inset 0 0 0 2000px rgba(243, 255, 67, 0.3)");
             }  
     }
    }
      
 }

 
 //Display up moves
 PossibleMoveRight(){
    
    
    let currentPlayer = this.playerStore.find((playerObj) => {return playerObj.name == this.currentTurn })

    let row = currentPlayer.position.row;
    let col = currentPlayer.position.col;

    if (this.map[row][col].player == true){

     //Looping to display movable spots
     for(let i = 1; i <= 3; i++){
         col = col+1; //Increasing the value of col because right means plus but on the same row
         if(col >= 10){
             break; //Break loop if we move out of the map that is, more than or equal to 10
         }
         // If there's a block or player in the grid, i break
         if(this.map[row][col].block == true || this.map[row][col].player == true){
                 break;
             }
              //If there's no weapon i highlight the box
             if(this.map[row][col].weapon != true){
                this.map[row][col].movable = true;
                 $("#grid_"+row+"_"+col).css("background","#fcf75e");
             }else{
                 //If there's a weapon on the way i apply special css
                 this.map[row][col].movable = true;
             $("#grid_"+row+"_"+col).css("box-shadow","inset 0 0 0 2000px rgba(243, 255, 67, 0.3)");
             }  
     }
    }
      
 }


 // Remove possible moves when player plays
  //Remove Display up moves
  removePossibleMoveUp = ()=>{
        
    let currentPlayer = this.playerStore.find((playerObj) => {return playerObj.name == this.currentTurn })

    let row = currentPlayer.position.row;
    let col = currentPlayer.position.col;
  

     //Looping to remove display movable spots
     for(let i = 1; i <= 3; i++){
         row = row-1; // Reducing the value of row because up means minus but on the same col
         if(row < 0){
             break;//Break loop if we are out of the map, that is less than 0
         }
         // If there's a block or player in the grid, i break
         if(this.map[row][col].block == true || this.map[row][col].player == true){
                 break;
             }
             if(this.map[row][col].weapon != true){
              //If there's no weapon i highlight the box
              this.map[row][col].movable = false;
                 $("#grid_"+row+"_"+col).css("background","");
             }else{
                 //If there's a weapon on the way i apply special css
                 this.map[row][col].movable = false;
             $("#grid_"+row+"_"+col).css("box-shadow","");
            
             }  
     }
 }

 //Remove Display Down moves
 removePossibleMoveDown = () => {
      
    let currentPlayer = this.playerStore.find((playerObj) => {return playerObj.name == this.currentTurn })

    let row = currentPlayer.position.row;
    let col = currentPlayer.position.col;


     //Looping to remove display movable spots
     for(let i = 1; i <= 3; i++){
         row = row+1; //Increasing the value of rows because down mean plus but on the same col
         if(row >= 10){
             break;//Break loop if we move out of the map that is, more than or equal to 10
         }
         // If there's a block or player in the grid, i break
         if(this.map[row][col].block == true || this.map[row][col].player == true){
                 break;
             }
             if(this.map[row][col].weapon != true){
                 //If there's no weapon i highlight the box
                 this.map[row][col].movable = false;
                 $("#grid_"+row+"_"+col).css("background","");
             }else{
              //If there's a weapon on the way i apply special css
              this.map[row][col].movable = false;
             $("#grid_"+row+"_"+col).css("box-shadow","");
            
             }  
     }
     
 }

 //Remove Display up moves
 removePossibleMoveLeft = () => {
    
    let currentPlayer = this.playerStore.find((playerObj) => {return playerObj.name == this.currentTurn })

    let row = currentPlayer.position.row;
    let col = currentPlayer.position.col;

     //Looping to remove display movable spots
     for(let i = 1; i <= 3; i++){
         col = col-1; //Reducing instead the value of col here because, Left means minus col but on the same row
         if(col < 0){
             break;//Break if col is less than 0, that is goes out of the map
         }
         // If there's a block or player in the grid, i break
         if(this.map[row][col].block == true || this.map[row][col].player == true){
                 break;
             }
             //If there's no weapon i highlight the box
             if(this.map[row][col].weapon != true){
                this.map[row][col].movable = false;
                 $("#grid_"+row+"_"+col).css("background","");
             }else{
                 //If there's a weapon on the way i apply special css
                 this.map[row][col].movable = false;
             $("#grid_"+row+"_"+col).css("box-shadow","");
             }  
     }
   
 }

//Display up moves
removePossibleMoveRight = () => {

    let currentPlayer = this.playerStore.find((playerObj) => {return playerObj.name == this.currentTurn })

    let row = currentPlayer.position.row;
    let col = currentPlayer.position.col;

     //Looping to remove display movable spots
     for(let i = 1; i <= 3; i++){
         col = col+1; //Increasing the value of col because right means plus but on the same row
         if(col >= 10){
             break; //Break loop if we move out of the map that is, more than or equal to 10
         }
         // If there's a block or player in the grid, i break
         if(this.map[row][col].block == true || this.map[row][col].player == true){
                 break;
             }
              //If there's no weapon i highlight the box
             if(this.map[row][col].weapon != true){
                this.map[row][col].movable = false;
                 $("#grid_"+row+"_"+col).css("background","");
             }else{
                 //If there's a weapon on the way i apply special css
                 this.map[row][col].movable = false;
             $("#grid_"+row+"_"+col).css("box-shadow","");
             }  
     }

      
 }

 //Monitor fighting horizontally or vertically
//Check for fight up
fightMonitorUp = (clickedRow, clickedColumn) =>{
    let row = clickedRow;
    let col = clickedColumn;

      for(let i = 1; i <= 1; i++){
        row = row - 1;
        if(row < 0){
            break; //Break loop if we move out of the map
        }
        // If there's a player we call for the fight function
        if(this.map[row][col].player){
            console.log("there's a player above here");
            window.location.href = "#fight-modal";
            //calling for the fight
            theBoard.fight();
               break;
            }
              
    }

}

//Check for fight down
fightMonitorDown = (clickedRow, clickedColumn) =>{
    let row = clickedRow;
    let col = clickedColumn;

      for(let i = 1; i <= 1; i++){
        row = row + 1;
        if(row >= 10){
            break; //Break loop if we move out of the map
        }
        // If there's a player we call for the fight function
        if(this.map[row][col].player){
            console.log("there's a player Under");
            window.location.href = "#fight-modal";
            //calling for the fight
            theBoard.fight();
                break;
            }
    }


}

//Check for left
fightMonitorLeft = (clickedRow, clickedColumn) =>{
    let row = clickedRow;
    let col = clickedColumn;

      for(let i = 1; i <= 1; i++){
        col = col - 1;
        if(col < 0){
            break; //Break loop if we move out of the map
        }
        // If there's a player we call for the fight function
        if(this.map[row][col].player){
            console.log("there's a player on left");
            window.location.href = "#fight-modal";
            //calling for the fight
            theBoard.fight();
                break;
            }
              
    }

}

//Check for fight right
fightMonitorRight = (clickedRow, clickedColumn) =>{
    let row = clickedRow;
    let col = clickedColumn;

      for(let i = 1; i <= 1; i++){
        col = col + 1;
        if(col >= 10){
            break; //Break loop if we move out of the map
        }
        // If there's a player we call for the fight function
        if(this.map[row][col].player){
            console.log("there's a player on right");
            window.location.href = "#fight-modal";
             //calling for the fight
                theBoard.fight();
                break;
            }
    }


}

 //Check to start fight
 checkToStartFight = (clickedRow, clickedColumn) =>{

    this.fightMonitorUp(clickedRow, clickedColumn);
    this.fightMonitorDown(clickedRow, clickedColumn);
    this.fightMonitorRight(clickedRow, clickedColumn);
    this.fightMonitorLeft(clickedRow, clickedColumn);
    

 }

//Calculate movable cells of current player
 calculateMovableCells = () => {
    this.PossibleMoveUp();
    this.PossibleMoveDown();
    this.PossibleMoveLeft();
    this.PossibleMoveRight();
}

//Calculate previous cells of current player
calculateRemovableMovableCells = () =>{
    this.removePossibleMoveUp();
    this.removePossibleMoveDown();
    this.removePossibleMoveLeft();
    this.removePossibleMoveRight();
}

//Clearing the previous player's position on the map
clearCell = () => {
    let currentPlayer = this.playerStore.find((playerObj) => {return playerObj.name == this.currentTurn });
    let row = currentPlayer.position.row;
    let col = currentPlayer.position.col;

    theBoard.map[row][col] = {
        element: null,
        block: null, 
        player: null, 
        playerName: '',
        weapon: null,
        weaponName: '',
        movableFor: '', //store player name here
    }

    $("#grid_"+row+"_"+col).css("background",""); //Removing the player from previous cell
    this.calculateRemovableMovableCells();

}

fight = () =>{
    //Event Listerners for the fight
    let playerName = this.currentTurn;

    $('#Player1-attack').click(function() {
        playerName = 'Player2'
        handleButtons(playerName);
    });

    $('#Player1-defend').click(function() {
        playerName = 'Player2'
        handleButtons(playerName);
    });

    $('#Player2-attack').click(function() {
        playerName = 'Player1'
        handleButtons(playerName);
    });

    $('#Player2-defend').click(function() {
        playerName = 'Player1'
        handleButtons(playerName);
    });
    handleButtons(playerName);
        
}

}//end of class


//To handle the styling of the buttons
handleButtons = (player) => {
    if(player == 'Player1'){
        $('#Player1-attack').css("opacity","1");
        $('#Player1-defend').css("opacity","1");

        $('#Player2-attack').css("opacity",".5");
        $('#Player2-defend').css("opacity",".5");

        $('#Player1-attack').css("cursor","auto");
        $('#Player1-defend').css("cursor","auto");

        $('#Player2-attack').css("cursor","not-allowed");
        $('#Player2-defend').css("cursor","not-allowed");

        $('#Player1-attack').prop('disabled', false);
        $('#Player1-defend').prop('disabled', false);

        $('#Player2-attack').prop('disabled', true);
        $('#Player2-defend').prop('disabled', true); 
        
}else{
    $('#Player2-attack').css("opacity","1");
    $('#Player2-defend').css("opacity","1");

    $('#Player1-attack').css("opacity",".5");
    $('#Player1-defend').css("opacity",".5");

    $('#Player2-attack').css("cursor","auto");
    $('#Player2-defend').css("cursor","auto");

    $('#Player1-attack').css("cursor","not-allowed");
    $('#Player1-defend').css("cursor","not-allowed");

    $('#Player2-attack').prop('disabled', false);
    $('#Player2-defend').prop('disabled', false);

    $('#Player1-attack').prop('disabled', true);
    $('#Player1-defend').prop('disabled', true);
}
}




//The main
// On page load function

let theBoard; //My Board variable
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
    
   //Loop to display 7 block
    for(var i = 1; i<=7; i++){
        theBoard.placeBlockElement(theBoard.randomRAC(), theBoard.randomRAC(), 'assets/img/wall.png');
    }

    //Possible moves for player
    theBoard.calculateMovableCells();
    
    //Onclick regenerates map
    $('#new-game').click(function() {
        location.reload();
        console.log("Reloading map");
    });
//Event listener for my map
   $('#container').click((e) => {
    e.preventDefault();
    let elementId = e.target.id
    let clickedRow = elementId.split('_')[1]
    let clickedColumn = elementId.split('_')[2]
    if (theBoard.map[clickedRow][clickedColumn].movable) {
        //if weapon, please update player attack in store based on that weapon damage
        
        theBoard.clearCell(); // Clearing the previous player's position on the map
        let currentPlayer = theBoard.playerStore.find((playerObj) => {return playerObj.name == theBoard.currentTurn });
        
        //----------------------DROP PREVIOUS WEAPON LOGIC---------------------
        
        if (theBoard.map[clickedRow][clickedColumn].weapon && !currentPlayer.weaponName){
            currentPlayer.weaponName = theBoard.map[clickedRow][clickedColumn].weaponName
            //currentPlayer.damage +=  theBoard.weaponsStore[theBoard.map[clickedRow][clickedColumn].weaponName].damage 
            currentPlayer.weaponPosition = {row: clickedRow, col: clickedColumn}
        }
        else if (theBoard.map[clickedRow][clickedColumn].weapon && currentPlayer.weaponName) {
            let oldWeaponName = currentPlayer.weaponName
            let oldWeaponPosition = currentPlayer.weaponPosition
            currentPlayer.weaponName = theBoard.map[clickedRow][clickedColumn].weaponName;
            theBoard.placeWeaponElement(oldWeaponPosition.row, oldWeaponPosition.col, theBoard.weaponsStore[oldWeaponName].image, oldWeaponName);
        }


        //----------------------DROP PREVIOUS WEAPON LOGIC ENDS---------------------
        //allow player to move
         //update player position
        theBoard.placePlayerElement(parseInt(clickedRow), parseInt(clickedColumn), currentPlayer.image, currentPlayer.name);

        //Check if player is beside to start fight
        theBoard.checkToStartFight(parseInt(clickedRow), parseInt(clickedColumn));
       
        console.log(`Row is ${clickedRow}, Column is ${clickedColumn}`);
        theBoard.currentTurn = theBoard.currentTurn == 'Player1' ? 'Player2' : 'Player1';
        theBoard.calculateMovableCells();

       
       
 
  
    }   
})

   


});
