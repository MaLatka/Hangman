const wordsToGuess = [
    "pesto",
    "croissant",
    "eggroll",
    "hummus",
    "sashimi",
    "burrito",
    //"quesadilla",
    //"dumpling",
    "chocolate",
    //"okonomiyaki",
    "matcha",
    "ramen",
    "curry"
];
let guessedLetters = [];
let theAnswer = "";

let mistakes = 0;
let guessedAnswer = false;

function startGame() {
    guessedAnswer = false;

    // getting the word to guess
    theAnswer = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)];

    //$(".usedLetters").text(guessedLetters);

    // creating containers for the letters and hiding them
    for (let i = 0; i < theAnswer.length; i++) {
    let wordLetter = document.createElement("div");
    wordLetter.innerHTML = theAnswer[i];
    wordLetter.setAttribute("class", "answerLetter " + i);
    document.querySelector(".answer").appendChild(wordLetter);
    $(".answerLetter").addClass("hidden");
    }  
}

function resetGame() {
    // reseting values for user input and lifes
    guessedLetters = [];
    mistakes = 0;
    theAnswer = "";

    // reseting elements in the HTML file
    $("img").attr("src", "images/hangman0.png");
    $(".answer").empty();
    $(".usedLetters").empty();
    
    startGame();
}

function checkLetter(guessedLast) {
    let arrAnswer = theAnswer.split("");

    //while checking if the last letter is in the answer the func reveals the correct letters
    for (let i = 0; i < arrAnswer.length; i++) {
        if (arrAnswer[i] === guessedLast) {
            $("." + i).removeClass("hidden");
        }  
    }
    // in another case we just change the picture and increase mistakes
    if (!arrAnswer.includes(guessedLast)) {
            mistakes++;
            $("img").attr("src", "images/hangman" + mistakes + ".png");
    }
}

function checkIfWon() {

    //checking if user guessed the letters before running out of lifes
    let arrAnswer = theAnswer.split("");
    if (arrAnswer.every(r => guessedLetters.includes(r)) && mistakes < 6) {
        $("h2").text("Congrats, you guessed the word! Press Enter to play again.");
        $("answerDesc").text("Yaaay!");
        guessedAnswer = true;
    } 
    
    // if the lifes ran out its game over
    else if (mistakes === 6) {
        $("h2").text("Out of lifes... Press Enter to start again!");
        $(".answerLetter").removeClass("hidden");
        $(".answerDesc").text("Your word was: ");
    }
}

startGame();

$(document).on("keypress", (event) => {

    //if the user lost or guessed the answer the game won't restart on random key press
    if (mistakes < 6 && guessedAnswer != true ) {
        guessedLetters.push(event.key);
        $(".usedLetters").text(guessedLetters);
        checkLetter(event.key);
        checkIfWon();
    }
})

$(document).on("keypress", function (event) {
    if (mistakes < 6 && event.keyCode === 13) {
        resetGame();
        $("h2").text("Choose a letter by pressing the coresponding key on your keyboard.");
    }
    else if (event.keyCode === 13) {
        resetGame();
        $("h2").text("Try again! Press a key on your keyboard.");
    }
});