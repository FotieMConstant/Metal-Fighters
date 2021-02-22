//Check to start fight
function checkToStartFight(row, col) {

    if (row < 9 && theBoard.map[row + 1][col].player == true) {
        console.log("there's a player down");
        window.location.href = "#fight-modal";
        //calling for the fight
        fight();
    } else if (row > 0 && theBoard.map[row - 1][col].player == true) {
        console.log("there's a player on top");
        window.location.href = "#fight-modal";
        //calling for the fight
        fight();
    } else if (col < 9 && theBoard.map[row][col + 1].player == true) {
        console.log("there's a player on right");
        window.location.href = "#fight-modal";
        //calling for the fight
        fight();
    } else if (col > 0 && theBoard.map[row][col - 1].player == true) {
        console.log("there's a player on left");
        window.location.href = "#fight-modal";
        //calling for the fight
        fight();
    }
}

function fight() {
    //Event Listerners for the fight
    let playerName = theBoard.currentTurn;
    //Player's life
    let Player1Life = 100;
    let Player2Life = 100;
    //Keeping track if the player has defended or not
    let Player1Defend = false;
    let Player2Defend = false;


    $('#Player1-attack').click(function () {
        let currentPlayer = playerStore.find((playerObj) => {
            return playerObj.name == playerName
        });
        //In case the player has defended
        if (Player2Defend === true) {
            Player2Life -= currentPlayer.attack / 2;
            $('.Player2-life').text(Player2Life);
            Player2Defend = false;
        } else {
            //In case the player hasn't defended
            Player2Life -= currentPlayer.attack;
            $('.Player2-life').text(Player2Life);
        }
        //When the opponent's player's life is less than or equal to 0 declare winner
        if (Player2Life <= 0) {
            console.log("Player 1 wins");
            $("#winner-avatar").append('<img class="player-player1" src="assets/img/player1-poster.png" alt="Player-1">')
            $("#winner").text("Player 1 Wins");
            window.location.href = "#gameover-modal"; //Calling for the gameover modal
        }
        playerName = 'Player2'
        handleButtons(playerName);
        Player1Defend = false;
        $('#defence-player1').text(Player1Defend);

    });

    $('#Player1-defend').click(function () {
        Player1Defend = true; //Player 1 defending
        $('#defence-player1').text(Player1Defend);
        playerName = 'Player2'
        handleButtons(playerName);
    });

    $('#Player2-attack').click(function () {
        let currentPlayer = playerStore.find((playerObj) => {
            return playerObj.name == playerName
        });
        //In case the player has defended
        if (Player1Defend === true) {
            Player1Life -= currentPlayer.attack / 2;
            $('.Player1-life').text(Player1Life);
            Player1Defend = false;
        } else {
            //In case the player hasn't defended
            Player1Life -= currentPlayer.attack;
            $('.Player1-life').text(Player1Life);
        }
        //When the opponent's player's life is less than or equal to 0 declare winner
        if (Player1Life <= 0) {
            console.log("Player 2 wins");
            $("#winner-avatar").append('<img class="player-poster2" src="assets/img/player2-poster.png" alt="Player-2">')
            $("#winner").text("Player 2 Wins");
            window.location.href = "#gameover-modal"; //Calling for the gameover modal
        }
        playerName = 'Player1'
        handleButtons(playerName);
        Player2Defend = false;
        $('#defence-player2').text(Player2Defend);

    });

    $('#Player2-defend').click(function () {
        Player2Defend = true; //Player 2 defending
        $('#defence-player2').text(Player2Defend);
        playerName = 'Player1'
        handleButtons(playerName);
    });
    //Calling for the styling function for the buttons
    handleButtons(playerName);

}

//To handle the styling of the buttons
function handleButtons(player) {
    if (player == 'Player1') {
        $('#Player1-attack').css("opacity", "1");
        $('#Player1-defend').css("opacity", "1");

        $('#Player2-attack').css("opacity", ".5");
        $('#Player2-defend').css("opacity", ".5");

        $('#Player1-attack').css("cursor", "auto");
        $('#Player1-defend').css("cursor", "auto");

        $('#Player2-attack').css("cursor", "not-allowed");
        $('#Player2-defend').css("cursor", "not-allowed");

        $('#Player1-attack').prop('disabled', false);
        $('#Player1-defend').prop('disabled', false);

        $('#Player2-attack').prop('disabled', true);
        $('#Player2-defend').prop('disabled', true);

    } else {
        $('#Player2-attack').css("opacity", "1");
        $('#Player2-defend').css("opacity", "1");

        $('#Player1-attack').css("opacity", ".5");
        $('#Player1-defend').css("opacity", ".5");

        $('#Player2-attack').css("cursor", "auto");
        $('#Player2-defend').css("cursor", "auto");

        $('#Player1-attack').css("cursor", "not-allowed");
        $('#Player1-defend').css("cursor", "not-allowed");

        $('#Player2-attack').prop('disabled', false);
        $('#Player2-defend').prop('disabled', false);

        $('#Player1-attack').prop('disabled', true);
        $('#Player1-defend').prop('disabled', true);
    }
}