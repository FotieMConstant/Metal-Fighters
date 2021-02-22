//Display up moves
PossibleMoveUp = () => {
    let currentPlayer = playerStore.find((playerObj) => {
        return playerObj.name == theBoard.currentTurn
    })
    let row = currentPlayer.position.row;
    let col = currentPlayer.position.col;

    if (theBoard.map[row][col].player == true) {

        //Looping to display movable spots
        for (let i = 1; i <= 3; i++) {
            row = row - 1; // Reducing the value of row because up means minus but on the same col
            if (row < 0) {
                break; //Break loop if we are out of the map, that is less than 0
            }
            // If there's a block or player in the grid, i break
            if (theBoard.map[row][col].block == true || theBoard.map[row][col].player == true) {
                break;
            }
            if (theBoard.map[row][col].weapon != true) {
                //If there's no weapon i highlight the box
                theBoard.map[row][col].movable = true;
                $("#grid_" + row + "_" + col).css("background", "#fcf75e");
            } else {
                //If there's a weapon on the way i apply special css
                theBoard.map[row][col].movable = true;
                $("#grid_" + row + "_" + col).css("box-shadow", "inset 0 0 0 2000px rgba(243, 255, 67, 0.3)");

            }
        }
    }

}

//Display up moves
PossibleMoveDown = () => {
    let currentPlayer = playerStore.find((playerObj) => {
        return playerObj.name == theBoard.currentTurn
    })

    let row = currentPlayer.position.row;
    let col = currentPlayer.position.col;

    if (theBoard.map[row][col].player == true) {

        //Looping to display movable spots
        for (let i = 1; i <= 3; i++) {
            row = row + 1; //Increasing the value of rows because down mean plus but on the same col
            if (row >= 10) {
                break; //Break loop if we move out of the map that is, more than or equal to 10
            }
            // If there's a block or player in the grid, i break
            if (theBoard.map[row][col].block == true || theBoard.map[row][col].player == true) {
                break;
            }
            if (theBoard.map[row][col].weapon != true) {
                //If there's no weapon i highlight the box
                theBoard.map[row][col].movable = true;
                $("#grid_" + row + "_" + col).css("background", "#fcf75e");
            } else {
                //If there's a weapon on the way i apply special css
                theBoard.map[row][col].movable = true;
                $("#grid_" + row + "_" + col).css("box-shadow", "inset 0 0 0 2000px rgba(243, 255, 67, 0.3)");

            }
        }
    }

}


//Display up moves
PossibleMoveLeft = () => {
    let currentPlayer = playerStore.find((playerObj) => {
        return playerObj.name == theBoard.currentTurn
    })

    let row = currentPlayer.position.row;
    let col = currentPlayer.position.col;

    if (theBoard.map[row][col].player == true) {

        //Looping to display movable spots
        for (let i = 1; i <= 3; i++) {
            col = col - 1; //Reducing instead the value of col here because, Left means minus col but on the same row
            if (col < 0) {
                break; //Break if col is less than 0, that is goes out of the map
            }
            // If there's a block or player in the grid, i break
            if (theBoard.map[row][col].block == true || theBoard.map[row][col].player == true) {
                break;
            }
            //If there's no weapon i highlight the box
            if (theBoard.map[row][col].weapon != true) {
                theBoard.map[row][col].movable = true;
                $("#grid_" + row + "_" + col).css("background", "#fcf75e");
            } else {
                //If there's a weapon on the way i apply special css
                theBoard.map[row][col].movable = true;
                $("#grid_" + row + "_" + col).css("box-shadow", "inset 0 0 0 2000px rgba(243, 255, 67, 0.3)");
            }
        }
    }

}


//Display up moves
PossibleMoveRight = () => {
    let currentPlayer = playerStore.find((playerObj) => {
        return playerObj.name == theBoard.currentTurn
    })

    let row = currentPlayer.position.row;
    let col = currentPlayer.position.col;

    if (theBoard.map[row][col].player == true) {

        //Looping to display movable spots
        for (let i = 1; i <= 3; i++) {
            col = col + 1; //Increasing the value of col because right means plus but on the same row
            if (col >= 10) {
                break; //Break loop if we move out of the map that is, more than or equal to 10
            }
            // If there's a block or player in the grid, i break
            if (theBoard.map[row][col].block == true || theBoard.map[row][col].player == true) {
                break;
            }
            //If there's no weapon i highlight the box
            if (theBoard.map[row][col].weapon != true) {
                theBoard.map[row][col].movable = true;
                $("#grid_" + row + "_" + col).css("background", "#fcf75e");
            } else {
                //If there's a weapon on the way i apply special css
                theBoard.map[row][col].movable = true;
                $("#grid_" + row + "_" + col).css("box-shadow", "inset 0 0 0 2000px rgba(243, 255, 67, 0.3)");
            }
        }
    }

}


//Calculate movable cells of current player
function calculateMovableCells() {
    PossibleMoveUp();
    PossibleMoveDown();
    PossibleMoveLeft();
    PossibleMoveRight();
}


// Remove possible moves when player plays
//Remove Display up moves
removePossibleMoveUp = () => {

    let currentPlayer = playerStore.find((playerObj) => {
        return playerObj.name == theBoard.currentTurn
    })

    let row = currentPlayer.position.row;
    let col = currentPlayer.position.col;


    //Looping to remove display movable spots
    for (let i = 1; i <= 3; i++) {
        row = row - 1; // Reducing the value of row because up means minus but on the same col
        if (row < 0) {
            break; //Break loop if we are out of the map, that is less than 0
        }
        // If there's a block or player in the grid, i break
        if (theBoard.map[row][col].block == true || theBoard.map[row][col].player == true) {
            break;
        }
        if (theBoard.map[row][col].weapon != true) {
            //If there's no weapon i highlight the box
            theBoard.map[row][col].movable = false;
            $("#grid_" + row + "_" + col).css("background", "");
        } else {
            //If there's a weapon on the way i apply special css
            theBoard.map[row][col].movable = false;
            $("#grid_" + row + "_" + col).css("box-shadow", "");

        }
    }
}

//Remove Display Down moves
removePossibleMoveDown = () => {

    let currentPlayer = playerStore.find((playerObj) => {
        return playerObj.name == theBoard.currentTurn
    })

    let row = currentPlayer.position.row;
    let col = currentPlayer.position.col;


    //Looping to remove display movable spots
    for (let i = 1; i <= 3; i++) {
        row = row + 1; //Increasing the value of rows because down mean plus but on the same col
        if (row >= 10) {
            break; //Break loop if we move out of the map that is, more than or equal to 10
        }
        // If there's a block or player in the grid, i break
        if (theBoard.map[row][col].block == true || theBoard.map[row][col].player == true) {
            break;
        }
        if (theBoard.map[row][col].weapon != true) {
            //If there's no weapon i highlight the box
            theBoard.map[row][col].movable = false;
            $("#grid_" + row + "_" + col).css("background", "");
        } else {
            //If there's a weapon on the way i apply special css
            theBoard.map[row][col].movable = false;
            $("#grid_" + row + "_" + col).css("box-shadow", "");

        }
    }

}

//Remove Display up moves
removePossibleMoveLeft = () => {

    let currentPlayer = playerStore.find((playerObj) => {
        return playerObj.name == theBoard.currentTurn
    })

    let row = currentPlayer.position.row;
    let col = currentPlayer.position.col;

    //Looping to remove display movable spots
    for (let i = 1; i <= 3; i++) {
        col = col - 1; //Reducing instead the value of col here because, Left means minus col but on the same row
        if (col < 0) {
            break; //Break if col is less than 0, that is goes out of the map
        }
        // If there's a block or player in the grid, i break
        if (theBoard.map[row][col].block == true || theBoard.map[row][col].player == true) {
            break;
        }
        //If there's no weapon i highlight the box
        if (theBoard.map[row][col].weapon != true) {
            theBoard.map[row][col].movable = false;
            $("#grid_" + row + "_" + col).css("background", "");
        } else {
            //If there's a weapon on the way i apply special css
            theBoard.map[row][col].movable = false;
            $("#grid_" + row + "_" + col).css("box-shadow", "");
        }
    }

}

//Display up moves
removePossibleMoveRight = () => {

    let currentPlayer = playerStore.find((playerObj) => {
        return playerObj.name == theBoard.currentTurn
    })

    let row = currentPlayer.position.row;
    let col = currentPlayer.position.col;

    //Looping to remove display movable spots
    for (let i = 1; i <= 3; i++) {
        col = col + 1; //Increasing the value of col because right means plus but on the same row
        if (col >= 10) {
            break; //Break loop if we move out of the map that is, more than or equal to 10
        }
        // If there's a block or player in the grid, i break
        if (theBoard.map[row][col].block == true || theBoard.map[row][col].player == true) {
            break;
        }
        //If there's no weapon i highlight the box
        if (theBoard.map[row][col].weapon != true) {
            theBoard.map[row][col].movable = false;
            $("#grid_" + row + "_" + col).css("background", "");
        } else {
            //If there's a weapon on the way i apply special css
            theBoard.map[row][col].movable = false;
            $("#grid_" + row + "_" + col).css("box-shadow", "");
        }
    }


}


//Calculate previous cells of current player
function calculateRemovableMovableCells() {
    this.removePossibleMoveUp();
    this.removePossibleMoveDown();
    this.removePossibleMoveLeft();
    this.removePossibleMoveRight();
}