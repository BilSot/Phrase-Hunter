/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase{
    constructor(phrase) {
        this.phrase = phrase;
    }

    /**
     * It creates the `placeholders` for the phrase's letters and spaces and it applies the according CSS style classes
     */
    addPhraseToDisplay(){
        //this adds letter placeholders to the display when the game starts.
        const divPhrase = document.querySelector('div#phrase');
        const ulElemPhrase = document.createElement('ul');
        for (let i = 0; i < this.phrase.length; i++){
            let liElem = document.createElement('li');
            if(/\s/.test(this.phrase[i])){
                liElem.setAttribute('class', 'space');
            }else {
                liElem.classList += 'hide letter js-letter';
                liElem.textContent = this.phrase[i];
            }

            ulElemPhrase.appendChild(liElem);
        }

        divPhrase.appendChild(ulElemPhrase);
    }

    /**
     * Checks to see if the letter selected by the player matches a letter in the phrase. If yes, it displays the letter
     * @param {String} keyPressed
     * @return {boolean} existingLetter
     */
    checkLetter(keyPressed){
        let existingLetter = false;
        for (let i = 0; i < this.phrase.length; i++) {
            if(this.phrase[i] === keyPressed){
                this.showMatchedLetter(keyPressed);
                existingLetter = true;
            }
        }
        return existingLetter;
    }

    /**
     * Displays the letter(s) on the board that matches the player's selection.
     * @param keyPressed
     */
    showMatchedLetter(keyPressed){
        let letters = document.getElementsByClassName('js-letter');
        for (let j = 0; j < letters.length; j++){
            if(letters[j].textContent === keyPressed){
                letters[j].classList.remove('hide');
                letters[j].classList.add('show');
            }
        }
    }
}
