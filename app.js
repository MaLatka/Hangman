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

function startGame() {
    // reseting values for user input and lifes
    guessedLetters = [];
    mistakes = 0;
    
    // getting the word to guess
    theAnswer = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)];
    //console.log(theAnswer);

    $("img").attr("src", "images/hangman0.png");
    $(".usedLetters").text(guessedLetters);
    // creating containers for the letters and hiding them
    for (let i = 0; i < theAnswer.length; i++) {
    let wordLetter = document.createElement("div");
    wordLetter.innerHTML = theAnswer[i];
    wordLetter.setAttribute("class", "answerLetter " + i);
    document.querySelector(".answer").appendChild(wordLetter);
    $(".answerLetter").addClass("hidden");
    }
    
}

startGame();

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

function checkProgress() {
    let arrAnswer = theAnswer.split("");
    
    //checking if user guessed the letters before using up all lifes
    if (arrAnswer.every(r => guessedLetters.includes(r)) && mistakes < 6) {
        $("h2").text("You guessed the word right! Congrats! Refresh the page to play again.");
        $("answerDesc").text("Yaaay!");
        //$(document).on("keypress", startGame);
    } 
    // if the lifes ran out its game over
    else if (mistakes === 6) {
        $("h2").text("Out of lifes... Refresh the page to start again!");
        $(".answerLetter").removeClass("hidden");
        $(".answerDesc").text("Your word was: ");
        //$(document).on("keypress", startGame);
    }
}

$(document).on("keypress", (event) => {
    //console.log(event.key);
    guessedLetters.push(event.key);
    $(".usedLetters").text(guessedLetters);
    checkLetter(event.key);
    checkProgress();
})

