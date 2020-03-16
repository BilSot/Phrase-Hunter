/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

/***
 * Create a new instance of the Game class and add event listeners for the start button and onscreen keyboard buttons:
 * Add a click event listener to the "Start Game" button which creates a new Game object and starts the game by calling the startGame() method.
 * Add click event listeners to each of the onscreen keyboard buttons, so that clicking a button calls the handleInteraction() method on the Game object.
 * Event delegation can also be used in order to avoid having to add an event listener to each individual keyboard button.
 * Clicking the space between and around the onscreen keyboard buttons should not result in the handleInteraction() method being called.
 ***/

var game = null;
//the Game is initialized in the event handler so that every time when the button is clicked, we have a new object created
document.querySelector('button#btn__reset').addEventListener('click', function () {
    game = new Game();
    game.startGame();
});
var buttons = document.getElementsByClassName('key');
for (let b = 0; b < buttons.length; b++){
    buttons[b].addEventListener('click', function (event) {
        game.handleInteraction(event.target);
    });
}
//since `buttons` is HTMLCollection, Array.from is used to create an actual array of the HTML elements
document.addEventListener('keyup', function(event){
    game.handleInteraction(Array.from(buttons).find(button => button.textContent === event.key));
});

