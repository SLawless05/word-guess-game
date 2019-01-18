// array of possible words to guess
var wordsArray =
    [
        "equivalent",
        "transmute",
        "circle",
        "fullmetal",
        "philosopher",
        "akahestry",
        "alchemy",
        "immortal",
        "gold",
    ];

// variable declarations 
const maxTries = 10;
var guessedLetters = [];
var guessingWord = [];
var currentWordIndex;
var remainingGuesses = 0;
var gameStarted = false;
var gameFinished = true;
var wins = 0;

//function which refreshes the display, to be called in resetGame() and makeGuess()
function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    if (remainingGuesses <= 0) {
        document.getElementById("startTryAgain").innerHTML = "Press Any Key to Get Started!";
        gameFinished = true;
    }
};

//function which resets the gamestate back to the start
function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;

    currentWordIndex = Math.floor(Math.random() * (wordsArray.length));

    guessedLetters = [];
    guessingWord = [];


    for (var i = 0; i < wordsArray[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }

    document.getElementById("startTryAgain").innerHTML = "Press any key to make your guess";

    updateDisplay();
};

//function which is called by the onkeyup, makes the guess
function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }

        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }

    updateDisplay();
    checkWin();
};

//function which is called by makeGuess(),  evaluates whether the guess is equal to one of the unguessed letters in the array
function evaluateGuess(letter) {
    var positions = [];

    for (var i = 0; i < wordsArray[currentWordIndex].length; i++) {
        if (wordsArray[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        remainingGuesses--;
    } else {
        for (var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};

//function which is called by makeGuess() evaluates whether or not the win condition has been met
function checkWin() {
    if (guessingWord.indexOf("_") === -1) {
        wins++;
        gameFinished = true;
    }
};

//onkeup event,  gets everything else running.
document.onkeyup = function (event) {
    if (gameFinished) {
        resetGame();
        gameFinished = false;
    }
    else {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};