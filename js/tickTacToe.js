///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   __ __| _)           __ __|                                    
//      |    |   __|        |   _` |   __|                         
//      |    |  (           |  (   |  (                            
//     _|   _| \___|       _| \__,_| \___|                       
//              __ __|                                             
//                 |   _ \    _ \              
//                 |  (   |   __/              
//                _| \___/  \___|              
//                                              *auth: Tom Bryson
/////////////////////////////////////////////////////////////////////////////////////////////////////
//========*******-------
$(document).ready(function () {

///Global Variables
let turnCounter = 0;
let player1Wins = 0;
let player2Wins = 0;

///Game Board
    let gameBoard = {
        A1: 0, A2: 0, A3: 0, 
        B1: 0, B2: 0, B3: 0, 
        C1: 0, C2: 0, C3: 0
    };

///////////////////////////////////////////========> Updates {gameBoard} object with new board state each turn ===---------
const updateBoard = function(id, val) { 
        Object.keys(gameBoard).forEach(key => {
            if (key === id) {
                gameBoard[key] = val;
                console.log(gameBoard);
            } 
        });
    }
///////////////////////////////===========> Buttons =======----

    $('.clearBoard').on('click', function (e) { /// Clear Board
        $('.box').removeClass('knot') &&
        $('.box').removeClass('cross');
        $('.box').addClass('canClick');
        gameBoard = {
            A1: 0, A2: 0, A3: 0, 
            B1: 0, B2: 0, B3: 0, 
            C1: 0, C2: 0, C3: 0
        };
    }
);

//////////////////////////=========> Reset scores

    $('.resetscores').on('click', function () {
        player1Wins = 0;
        player2Wins = 0;
        $('.p1score').text(player1Wins);
        $('.p2score').text(player2Wins);
        });

const celebration = function () {

}

const winner = function () {    /////////////////////////////////////////////////////////////////////////// Determines the winner of the game///////////
    if ((gameBoard.A1 === 'knot' && gameBoard.A2 === 'knot' && gameBoard.A3 === 'knot')||
        (gameBoard.A1 === 'knot' && gameBoard.B1 === 'knot' && gameBoard.C1 === 'knot')||
        (gameBoard.C1 === 'knot' && gameBoard.C2 === 'knot' && gameBoard.C3 === 'knot')||
        (gameBoard.A3 === 'knot' && gameBoard.B3 === 'knot' && gameBoard.C3 === 'knot')||
        (gameBoard.A2 === 'knot' && gameBoard.B2 === 'knot' && gameBoard.C2 === 'knot')||
        (gameBoard.B1 === 'knot' && gameBoard.B2 === 'knot' && gameBoard.B3 === 'knot')||
        (gameBoard.A1 === 'knot' && gameBoard.B2 === 'knot' && gameBoard.C3 === 'knot')||
        (gameBoard.C1 === 'knot' && gameBoard.B2 === 'knot' && gameBoard.A3 === 'knot')) {
        console.log('Player 1 Wins');
        player1Wins += 1;
        $(".box").removeClass('canClick');
        $('.p1score').text(player1Wins);
        celebration();
    } else if ((gameBoard.A1 === 'cross' && gameBoard.A2 === 'cross' && gameBoard.A3 === 'cross')||
        (gameBoard.A1 === 'cross' && gameBoard.B1 === 'cross' && gameBoard.C1 === 'cross')||
        (gameBoard.C1 === 'cross' && gameBoard.C2 === 'cross' && gameBoard.C3 === 'cross')||
        (gameBoard.A3 === 'cross' && gameBoard.B3 === 'cross' && gameBoard.C3 === 'cross')||
        (gameBoard.A2 === 'cross' && gameBoard.B2 === 'cross' && gameBoard.C2 === 'cross')||
        (gameBoard.B1 === 'cross' && gameBoard.B2 === 'cross' && gameBoard.B3 === 'cross')||
        (gameBoard.A1 === 'cross' && gameBoard.B2 === 'cross' && gameBoard.C3 === 'cross')||
        (gameBoard.C1 === 'cross' && gameBoard.B2 === 'cross' && gameBoard.A3 === 'cross')) {
        console.log('Player 2 Wins');
        player2Wins += 1;
        $(".box").removeClass('canClick');
        $('.p2score').text(player2Wins);
        celebration();
    } else {
    }};


const gameTurns = function() { /// Returns the player whos turn it is
        if (turnCounter % 2 === 0) {
            whosTurn = `Player 1's Turn...`; /// It's player ones turn
        } else {
            whosTurn = `Player 2's Turn...`; /// It's player twos turn
        }
        // $('.whosTurn').text(gameTurns());
        return whosTurn;
};

// const whosTurn = function () {
//     $('.whosTurn').text(gameTurns());
// }


////=========-------------------
/// Addition to player's array on click ****
///====----

$('.canClick').on('click', function (e) { /////========================> Get ID from box click
    let boxClicked = $(this).prop('id');
    if ($(this).hasClass('canClick') === true) {
        $(this).removeClass('canClick');
        if (turnCounter % 2 === 0) {
            $(this).addClass('knot');
            updateBoard(boxClicked, 'knot');
            winner();
        } else {
            $(this).removeClass('canClick');
            $(this).addClass('cross');
            updateBoard(boxClicked, 'cross');
            winner();
        }
        turnCounter += 1
    } else {
        console.log('invalid turn');
    }
});


});