
var letter = require("./Letter.js");
var game = require("./Game.js");
var word = require("./Word.js");
var inquirer = require("inquirer");

//THIS IS A TEST
//console.log("hello");

//THIS USER FUNCTION INITIATES THE WHOLE HANGMAN GAME WHERE IT CHECK IF A USER TYPES IN ANYTHING OTHER THAN A LETTER CHARACTER AND MARKS THEM INCORRECT
//ALSO HAS HANDLING FOR WINNING AND LOSING AND RUNNING OUT OF TRYS. 
function userGuess() {
    console.log(newWord.print());
    inquirer.prompt([{
        name: 'letter',
        type: 'text',
        message: 'Pick a letter any letter but only 1 letter please!:',
        validate: function(string) {
            var regEx = new RegExp("^[a-zA-Z\s]{1,1}$");
            if (regEx.test(string)) {
                return true;
            } else {
                return false;
                console.log("ONLY 1 letter at a time");

            }
        }
    }]).then(function(user) {
        console.log("================================================================");
        var letter = user.letter;
        newWord.checkLetter(letter);
        if (newWord.isLetterValid) {
            console.log("Sorry but you have already guessed that letter, please try a different one!");
            userGuess();
        } else {
            if (newWord.isComplete()) {
                console.log("CORRECT! YOU WIN!!!!!!!!!! " + newWord.chosenWord + " was the hidden word!");
                playAgain();
            } else if (newWord.trysLeft === 0) {
                console.log("Sorry but you are all out of trys! The answer was " + " ' " + newWord.chosenWord + " ' ");
                playAgain();
            } else {
                console.log("You have " + newWord.trysLeft + " remaining trys left!");
                console.log(".................................................................");
                userGuess();
            }
        }
    });
}

//THIS FUNCTION HANDLES THE PLAY AGAIN FEATURE ALSO CONOSLE LOGS IF THEY WANT TO PLAY AGAIN BY HADLING USER INPUT
function playAgain() {
    inquirer.prompt([{
        type: 'input',
        message: 'Would you like to play again? Please type "y" for Yes and "n" for No',
        name: 'playAgain'
    }]).then(function(user) {
        var answer = user.playAgain;
        if (answer == 'y') {
            game.userPrompt(function() {
                newWord = new word.Word(game.chosenWord);
                userGuess();
            });
        } else if (answer === 'n') {
            console.log("Thank you for playing!");
            return;
        }
    })
}


game.userPrompt(function() {
    newWord = new word.Word(game.chosenWord);
    userGuess();
});