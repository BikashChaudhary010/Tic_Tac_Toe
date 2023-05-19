'use strict';

// status-> what is the result of match
const statusDisplay = document.querySelector('#status');
const count = document.querySelector('#numberTurn');

// basic required variables
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
// making game state black means new game

// match winner
const winnMessage = () => `${currentPlayer} has won!`;
const drawMessage = () => `it's a draw!`;

// winning lines
const winnLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//handle the turns of players
function handlePlayerTurn() {
    const p1 = document.querySelector('#player1'),
        p2 = document.querySelector('#player2');

    if (currentPlayer === 'X') {
        p1.style.background = '#8458B3';
        p2.style.background = '#d0bdf4';
    } else {
        p1.style.background = '#d0bdf4';
        p2.style.background = '#8458B3';
    }
};

//handling clicks of players
function handleClick(event) {
    let clickedIndex = Number(event.target.getAttribute('id'));

    if (gameState[clickedIndex] !== '' || !gameActive)
        return;
    gameState[clickedIndex] = currentPlayer;
    event.target.innerHTML = currentPlayer;
    count.innerHTML = +count.innerHTML + 1;
    handleResult();
}

document.querySelectorAll('.cell')
    .forEach(cell => cell.addEventListener('click', handleClick));
// Firstly it will show only X, beacuse till now we currentPlayer = "X" that's why is playing only "X"


//game result
function handleResult() {
    let roundWon = false,
        winLine, a, b, c, i;

    for (i = 0; i < 8; ++i) {
        winLine = winnLines[i];
        a = gameState[winLine[0]];
        b = gameState[winLine[1]];
        c = gameState[winLine[2]];
        if (a === b && b === c && c !== '') {
            roundWon = true;
            break;
        }
    }

    if (roundWon || !gameState.includes('')) {
        if (roundWon) {
            statusDisplay.innerHTML = winnMessage();
            statusDisplay.style.color = '#139de2';
            winColors(winLine)
        } else
            statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "0" : "X";
    handlePlayerTurn();
}


// winner line color
function winColors(line) {
    console.log(`${line}`);
    for (let i = 0; i < 3; ++i) {
        let cell = document.getElementById(`${line[i]}`);
        cell.style.color = '#139de2';
        cell.style.fontSize = '80px';
    }
}

// Restart the Game
function handleRestart() {
    gameActive = true;
    currentPlayer = 'X';
    count.innerHTML = '0';
    statusDisplay.innerHTML = '';
    statusDisplay.style.color = 'black';
    gameState = ['', '', '', '', '', '', '', '', ''];
    // making game state empty means new game
    handlePlayerTurn();

    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerHTML = "";
        cell.style.color = '#232d55';
        cell.style.fontSize = '60px'
    });
}

handlePlayerTurn();

document.querySelector('#restart').addEventListener('click', handleRestart);