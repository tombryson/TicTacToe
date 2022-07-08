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
// Updates {gameBoard} object with new board state each turn
const updateBoard = function(id, val) { 
        Object.keys(gameBoard).forEach(key => {
            if (key === id) {
                gameBoard[key] = val;
            } 
        });
}
///Audio ///////////////////////
const clicker = $('#onClick');
clicker.prop("volume", 0.2);
clicker.prop('playbackRate', 1.6);

const hover = $('#onHover');
hover.prop('volume', 0.08);
hover.prop('playbackRate', 2.8);

const kids = $('#cheer');
kids.prop('volume', 0.3);
kids.prop('playbackRate', 0.8);
///////////////////////////////===========> Buttons =======----
    $('.clearBoard').on('click', function (e) { /// Clear Board
        $('.box').removeClass('knot') &&
        $('.box').removeClass('cross');
        $('.box').addClass('canClick');
        $('.title').removeClass('animate__bounceInLeft');
        $('.title').addClass('animate__headShake');
        hover.prop('volume', 0.1);
        if (gameTurns() === `Player 1's Turn...`) {
            turnCounter = 0;
            } else {         
            turnCounter = 1;
            }
        gameBoard = {
            A1: 0, A2: 0, A3: 0, 
            B1: 0, B2: 0, B3: 0, 
            C1: 0, C2: 0, C3: 0
        };
        updateText();
        // gameTurns();
    }
);
    $('.resetscores').on('click', function () { /// Reset scores
        player1Wins = 0;
        player2Wins = 0;
        $('.p1score').text(player1Wins);
        $('.p2score').text(player2Wins);
        });

///////Animations

const confetti = function () {
    $('#canvas').fadeIn(800).delay(500).fadeOut(2000);
    $('#cheer')[0].play();
}


const updateText = function () {
    $('.p1score').text(player1Wins);
    $('.p2score').text(player2Wins);
    $('.whosTurn').text(gameTurns());
}
const winner = function (symbol, player) {    ////////////////////////////////////////////// Determines the winner of the game///////////
    if ((gameBoard.A1 === symbol && gameBoard.A2 === symbol && gameBoard.A3 === symbol)||
        (gameBoard.A1 === symbol && gameBoard.B1 === symbol && gameBoard.C1 === symbol)||
        (gameBoard.C1 === symbol && gameBoard.C2 === symbol && gameBoard.C3 === symbol)||
        (gameBoard.A3 === symbol && gameBoard.B3 === symbol && gameBoard.C3 === symbol)||
        (gameBoard.A2 === symbol && gameBoard.B2 === symbol && gameBoard.C2 === symbol)||
        (gameBoard.B1 === symbol && gameBoard.B2 === symbol && gameBoard.B3 === symbol)||
        (gameBoard.A1 === symbol && gameBoard.B2 === symbol && gameBoard.C3 === symbol)||
        (gameBoard.C1 === symbol && gameBoard.B2 === symbol && gameBoard.A3 === symbol)) {
        $(".box").removeClass('canClick');
        hover.prop('volume', 0);
        $('.winner').text(`${ player } Wins`);
        $(".winner").fadeIn(900).delay(1100).fadeOut(1500);
        $('.title').removeClass('animate__headShake');
        confetti();
        return 1;
    } else if (turnCounter >= 8) {
        $('.winner').text(`It's a draw!`);
        $(".winner").fadeIn(900).delay(1100).fadeOut(1500);
        return 0;
    } else {
        return 0;
    }
};
const gameTurns = function() { /// Returns the player whos turn it is
        if (turnCounter % 2 === 0) {
            whosTurn = `Player 1's Turn...`; /// It's player ones turn
        } else {
            whosTurn = `Player 2's Turn...`; /// It's player twos turn
        }
        return whosTurn;
};

/////Misc /////

$('.canClick').on('mouseover', function () {
   hover[0].play();
});

////=========-------------------
/// Addition to player's array on click ****

var boxClick = $('#onClick');

$('.canClick').on('click', function (e) { /////========================> Get ID from box click
    let boxClicked = $(this).prop('id');
    if ($(this).hasClass('canClick') === true) {
        clicker[0].play();
        $(this).removeClass('canClick');
        if (turnCounter % 2 === 0) {
            $(this).addClass('knot');
            updateBoard(boxClicked, 'knot');
            player1Wins += winner('knot', 'Player 1');
        } else {
            $(this).removeClass('canClick');
            $(this).addClass('cross');
            updateBoard(boxClicked, 'cross');
            player2Wins += winner('cross', 'Player 2');
        }
        turnCounter += 1
        updateText();
    } else {
    }
});

});