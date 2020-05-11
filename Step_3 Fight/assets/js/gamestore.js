//Weapon and player store
function createWeaponsStore() {
    //update waeponsStore to have  multiple  key with values as objects. the name of the keys will be weapon names. the values   will hold details of the weapon
    // like attack, defend Initially set them to null
    weaponsStore = {
        knife: {
            position: {
                row: null,
                col: null
            },
            damage: 30,
            image: 'assets/img/weapons/knife.PNG'
        },
        gun: {
            position: {
                row: null,
                col: null
            },
            damage: 50,
            image: 'assets/img/weapons/gun.PNG'
        },
        axe: {
            position: {
                row: null,
                col: null
            },
            damage: 40,
            image: 'assets/img/weapons/axe.PNG'
        },
        swords: {
            position: {
                row: null,
                col: null
            },
            damage: 20,
            image: 'assets/img/weapons/sword.PNG'
        },
        fork: {
            position: {
                row: null,
                col: null
            },
            damage: 10,
            image: 'assets/img/weapons/fork.PNG'
        },
    }
}

function createPlayerStore() {
    //update playerStore to have two key with values as objects. those will hold details of the player
    // like player attack, defend, position etc. Initially set them to null

    playerStore = [{
            name: 'Player1',
            image: 'assets/img/players/player1.png',
            attack: 10,
            position: {
                row: null,
                col: null
            },
        },
        {
            name: 'Player2',
            attack: 10,
            image: 'assets/img/players/player2.png',
            position: {
                row: null,
                col: null
            },
        },
    ]
}