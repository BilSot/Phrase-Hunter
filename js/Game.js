/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game{
    constructor() {
        this.missed = 0;
        this.phrases = [];
        this.activePhrase = null;
    }

    /**
     * When the game starts, the necessary elements are shown on the screen and the initial view is hidden.
     * The phrases array is initialized and the active phrase is being selected randomly from that array
     */
    startGame(){
        document.querySelector('div#overlay').style.display = 'none';

        let liveHearts = document.getElementsByClassName('live-heart-icon');
        for (let n = 0; n < liveHearts.length; n++){
            liveHearts[n].style.display = 'inline';
        }
        let lostHearts = document.getElementsByClassName('lost-heart-icon');
        for (let n = 0; n < lostHearts.length; n++){
            lostHearts[n].style.display = 'inline';
        }

        let phrasesArr = [
            'treehouse is the best',
            'positive mindset',
            'success is the goal',
            'perception of things',
            'patience is a virtue',
            'summer holidays',
            'dandelions and rainbows',
            'fashion style'
        ];


        for (let i = 0; i < phrasesArr.length; i++){
            let phrase = new Phrase(phrasesArr[i].toLowerCase());
            this.phrases.push(phrase);
        }
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();

    }

    /**
     * Getter method - returns the active phrase
     */
    get gameActivePhrase(){
        return this.activePhrase;
    }

    /**
     * Returns a randomly selected phrase from the phrases' array
     * @return {Object} Phrase
     */
    getRandomPhrase(){
        let randomNumber = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randomNumber];
    }

    /**
     * It disables the key that represents the last used letter. It checks whether the letter exists in the phrase or not
     * and applies the according styling. In case all the letters are displayed, the gameOver function is called
     * @param {HTMLElement} keyPressed
     */
    handleInteraction(keyPressed){
        let thisClass = this;
        keyPressed.setAttribute('disabled', true);
        if(!this.gameActivePhrase.checkLetter(keyPressed.textContent)){
            keyPressed.classList += ' wrong';
            this.removeLife();
        }else{
            keyPressed.classList += ' chosen';
            if(this.checkForWin()){
                setTimeout(function(){
                    thisClass.gameOver("Congratulations! You found all the letters", true);
                }, 1500);
            }
        }
    }

    /**
     * In case of a wrong guess, the user's tries to play are decreased by removing one heart each time.
     * If the wrong guesses have reached up to 5, the gameOver function is called
     */
    removeLife(){
        let that = this;
        let missed = ++this.missed;
        let livesLeft = document.getElementsByClassName('tries');
        let heartIcon = livesLeft[missed - 1].querySelector('img.live-heart-icon');
        heartIcon.classList.add('animated', 'fadeOutDown');
        heartIcon.addEventListener('animationend', function(){
            if(missed === 5){
                that.gameOver("No more lives left. Better luck next time.", false);
            }
        });

    }

    /**
     * Checks if there are any letters from the phrase, that are still hidden and increases the counter `lettersRemaining`.
     * If the counter is greater than zero, it returns false (no win)
     * @return {boolean}
     */
    checkForWin(){
        let lettersRemaining = 0;
        let letterPlaceholders = document.getElementsByClassName('js-letter');
        for (let i = 0; i < letterPlaceholders.length; i++){
            if(letterPlaceholders[i].classList.contains('hide')){
                lettersRemaining++;
            }
        }
        if(lettersRemaining > 0){
            return false;
        }else{
            return true;
        }
    }

    /**
     * When the game has finished, the `overlay` HTML element is shown, used to cover the game's components. It displays
     * an according message to the user, whether they have won or not. The boolean parameter is used for determining of the
     * CSS style class that will be used on the page.
     * It resets the game's components for the next round.
     * @param {String} message
     * @param {boolean} success
     */
    gameOver(message, success){
        let overlayElem = document.querySelector('div#overlay');
        overlayElem.style.display = 'flex';
        if(success) {
            overlayElem.classList = 'win';
        }else{
            overlayElem.classList = 'lose';
        }
        document.getElementById('game-over-message').innerHTML = message;

        this.resetDOM();
    }

    /**
     * It resets the game's components for the next round. It enables all the keys of the virtual keyboard and removes the
     * animation CSS class from the `live heart` images
     */
    resetDOM(){
        document.querySelector('div#phrase').innerHTML = '';
        let livesLeft = document.getElementsByClassName('tries');
        for (let j = 0; j < livesLeft.length; j++){
            livesLeft[j].querySelector('img.live-heart-icon').classList.remove('fadeOutDown');
        }

        let keys = document.getElementsByClassName('key');
        for (let k = 0; k < keys.length; k++){
            keys[k].removeAttribute('disabled');
            keys[k].classList = 'key';
        }

        let liveHearts = document.getElementsByClassName('live-heart-icon');
        for (let n = 0; n < liveHearts.length; n++){
            liveHearts[n].style.display = 'none';
        }
        let lostHearts = document.getElementsByClassName('lost-heart-icon');
        for (let n = 0; n < lostHearts.length; n++){
            lostHearts[n].style.display = 'none';
        }

        document.getElementById('btn__reset').innerHTML = "Play Again";
    }
}
