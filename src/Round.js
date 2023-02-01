const Turn = require('../src/Turn');

class Round {
    constructor(deck) {
        this.deck = deck;
        this.currentCard = deck.cards[0];
        this.incorrectGuesses = [];
        this.turns = 0;
    }

    returnCurrentCard() {
        return this.currentCard;
    }

    takeTurn(guess) {
        const turn = new Turn(guess, this.currentCard);
        this.turns++;
        if(!turn.evaluateGuess()) {
            this.incorrectGuesses.push(this.currentCard.id)
        }
        this.deck.cards.shift();
        this.currentCard = this.deck.cards[0];
        return turn.giveFeedback()
    }

    calculatePercentCorrect() {
        const x = ((this.turns - this.incorrectGuesses.length) / this.turns)
        return Math.round(100 * x)
    }

    endRound() {
        const result = `** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly!`;
        console.log(result);
        return result;
    }
}

module.exports = Round;
