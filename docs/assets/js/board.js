//Random function
randomRAC = () => {
    let genNumber = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
    return genNumber;
}


//Grid layout / Creating the board

// Board class

class Board {
    constructor(grid_nb) {
        this.nb_grids = grid_nb;
        this.map = [];
        this.currentTurn = null;
    }
    // Function to create the grid
    createGrid = () => {
        for (var rows = 0; rows < this.nb_grids; rows++) {
            this.map[rows] = [];
            for (var columns = 0; columns < this.nb_grids; columns++) {
                $("#container").append('<div id="grid_' + rows + '_' + columns + '" class="grid"></div>');
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
        $(".grid").width(760 / this.nb_grids);
        $(".grid").height(760 / this.nb_grids);
        this.currentTurn = 'Player1'
    }

    //to place a block element on a spacified coordinate
    placeBlockElement = (row, col, element) => {
        //also need to check if weapons/players are not placed
        if (this.map[row][col].element != true) {
            this.map[row][col].block = true;
            this.map[row][col].element = true;
            $("#grid_" + row + "_" + col + "").css('background-image', 'url(' + element + ')');
        } else {
            this.placeBlockElement(randomRAC(), randomRAC(), element);
        }
    }

    //to place a weapon element on a spacified coordinate
    placeWeaponElement = (row, col, element, key) => {
        //also need to check if weapons/players are not placed
        if (this.map[row][col].element != true) {
            this.map[row][col].weapon = true;
            this.map[row][col].weaponName = key; //something
            this.map[row][col].element = true;
            //please update weapon store
            weaponsStore[key].position = {
                row: row,
                col: col
            };
            $("#grid_" + row + "_" + col + "").css('background-image', 'url(' + element + ')');
        } else {
            this.placeWeaponElement(randomRAC(), randomRAC(), element, key)
        }
    }

    placePlayerElement = (row, col, element, key) => {
        //also need to check if weapons/players are not placed
        //check each position and check if there's a player beside

        if (row < 9 && this.map[row + 1][col].player == true) {
            this.placePlayerElement(randomRAC(), randomRAC(), element, key);
        } else if (row > 0 && this.map[row - 1][col].player == true) {
            this.placePlayerElement(randomRAC(), randomRAC(), element, key);
        } else if (col < 9 && this.map[row][col + 1].player == true) {
            this.placePlayerElement(randomRAC(), randomRAC(), element, key);
        } else if (col > 0 && this.map[row][col - 1].player == true) {
            this.placePlayerElement(randomRAC(), randomRAC(), element, key);
        } else {
            if (this.map[row][col].element != true) {
                this.map[row][col].player = true;
                this.map[row][col].playerName = key; //something
                this.map[row][col].element = true;
                console.log(this.map); // Printing the map in a 2D array
                //please update player store
                let player = playerStore.find((player) => player.name == key);
                player.position = {
                    row: row,
                    col: col
                };
                console.log(player.name + " has attack " + player.attack);
                $("#grid_" + row + "_" + col + "").css("background-color", ""); // Initialize the background to null
                $("#grid_" + row + "_" + col).css("box-shadow", ""); // In case there's a weapon also set the box-shadow to null (When player crosses weapon)
                $("#grid_" + row + "_" + col + "").css('background-image', 'url(' + element + ')');
            } else {
                //This if is for when the player is in movement and falls on a weapon
                if (this.map[row][col].weapon) {
                    this.map[row][col].player = true;
                    this.map[row][col].playerName = key; //something
                    // this.map[row][col].element = true;
                    // this.map[row][col].weapon = true;
                    console.log(this.map); // Printing the map in a 2D array

                    //please update player store
                    let player = playerStore.find((player) => player.name == key);
                    player.position = {
                        row: row,
                        col: col
                    };
                    console.log("---> You just walked on a weapon!");
                    let weaponImg; // To store the damage's image
                    //Looping to get the weapon damages from the weapon store
                    //To update the player's attack
                    for (let weapon in weaponsStore) {
                        if (weapon == this.map[row][col].weaponName) {
                            player.attack = weaponsStore[weapon].damage;
                            weaponImg = weaponsStore[weapon].image;
                            break;
                        }
                    }
                    console.log(player.name + " has picked new attack " + player.attack);
                    //Updating the ui with the new weapon picked
                    if (player.name == "Player1") {
                        $(".attack-power-player1").text(player.attack);
                        $(".attack-weapon-player1").css('background-image', 'url(' + weaponImg + ')');
                    } else if (player.name == "Player2") {
                        $(".attack-power-player2").text(player.attack);
                        $(".attack-weapon-player2").css('background-image', 'url(' + weaponImg + ')');
                    }


                    $("#grid_" + row + "_" + col + "").css("background-color", ""); // Initialize the background to null
                    $("#grid_" + row + "_" + col).css("box-shadow", ""); // In case there's a weapon also set the box-shadow to null (When player crosses weapon)
                    $("#grid_" + row + "_" + col + "").css('background-image', 'url(' + element + ')');
                } else {
                    this.placePlayerElement(randomRAC(), randomRAC(), element, key);
                }
            }
        }
    }

    //Clearing the previous player's position on the map
    clearCell = () => {
        let currentPlayer = playerStore.find((playerObj) => {
            return playerObj.name == this.currentTurn
        });
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

        $("#grid_" + row + "_" + col).css("background", ""); //Removing the player from previous cell
        //function in movements.js file
        calculateRemovableMovableCells();

    }

} //end of class

//The main
// On page load function

let theBoard; //My Board variable
$(document).ready(function () {

    //initializing the Board class
    theBoard = new Board(10);
    theBoard.createGrid();

    //function in the gamestore.js file
    createWeaponsStore(); //Calling the Weapon store function in my class
    console.log(weaponsStore);
    //Looping to display weapons on map 
    for (var weapon in weaponsStore) {
        theBoard.placeWeaponElement(randomRAC(), randomRAC(), weaponsStore[weapon].image, weapon);
    }

    //function in the gamestore.js file
    createPlayerStore(); //Calling the Player store in my class
    playerStore.forEach(player => {
        theBoard.placePlayerElement(randomRAC(), randomRAC(), player.image, player.name);
    })

    //Loop to display 7 block
    for (var i = 1; i <= 7; i++) {
        theBoard.placeBlockElement(randomRAC(), randomRAC(), 'assets/img/wall.png');
    }

    //Possible moves for player
    //function in movements.js file
    calculateMovableCells();

    //Onclick regenerates map
    $('#new-game').click(function () {
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
            let currentPlayer = playerStore.find((playerObj) => {
                return playerObj.name == theBoard.currentTurn
            });

            //----------------------DROP PREVIOUS WEAPON LOGIC---------------------

            if (theBoard.map[clickedRow][clickedColumn].weapon && !currentPlayer.weaponName) {
                currentPlayer.weaponName = theBoard.map[clickedRow][clickedColumn].weaponName
                //currentPlayer.damage +=  weaponsStore[theBoard.map[clickedRow][clickedColumn].weaponName].damage 
                currentPlayer.weaponPosition = {
                    row: clickedRow,
                    col: clickedColumn
                }
            } else if (theBoard.map[clickedRow][clickedColumn].weapon && currentPlayer.weaponName) {
                let oldWeaponName = currentPlayer.weaponName
                let oldWeaponPosition = currentPlayer.weaponPosition
                currentPlayer.weaponName = theBoard.map[clickedRow][clickedColumn].weaponName;
                theBoard.placeWeaponElement(oldWeaponPosition.row, oldWeaponPosition.col, weaponsStore[oldWeaponName].image, oldWeaponName);
            }

            //----------------------DROP PREVIOUS WEAPON LOGIC ENDS---------------------
            //allow player to move
            //update player position
            theBoard.placePlayerElement(parseInt(clickedRow), parseInt(clickedColumn), currentPlayer.image, currentPlayer.name);

            //Check if player is beside to start fight 
            //Function in the fight.js file
            checkToStartFight(parseInt(clickedRow), parseInt(clickedColumn));

            console.log(`Row is ${clickedRow}, Column is ${clickedColumn}`);
            theBoard.currentTurn = theBoard.currentTurn == 'Player1' ? 'Player2' : 'Player1';
            //function in movements.js file
            calculateMovableCells();
        }
    });
});