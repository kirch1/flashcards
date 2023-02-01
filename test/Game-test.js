const chai = require('chai');
const assert = chai.assert;

const Game = require('../src/Game');
const Card = require('../src/Card');
const Deck = require('../src/Deck');
const data = require('../src/data');
const prototypeQuestions = data.prototypeData;

describe('Game', () => {
    let cards, game;
    beforeEach(() => {
        game = new Game();
        cards = game.createCards();
    });

    it('Should be able to create and Array of cards from data file', () => {
        assert.instanceOf(cards[0], Card);
        assert.equal(cards.length, prototypeQuestions.length);
    });
    
    it('Should be able to create a Deck from the data file cards', () => {
        const deck = game.createDeck(cards);
        assert.instanceOf(deck, Deck);
        assert.equal(deck.countCards(), prototypeQuestions.length);
    });
})
