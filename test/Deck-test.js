const chai = require('chai');
const expect = chai.expect;

const Card = require('../src/Card');
const Deck = require('../src/Deck');

describe('Deck', () => {
    let card1, card2, card3, cards, deck;
    beforeEach(() => {
        card1 = new Card(1, 'At what temperature does water boil?', ['212 F', '100 F', '32 F', '99 C'], '212 F');
        card2 = new Card(2, 'What is the largest desert on Earth?', ['Mojave', 'Antarctica', 'Sahara', 'Gobi'], 'Antarctica');
        card3 = new Card(3, 'What is chalk made of?', ['Flour', 'Limestone', 'Egg Shells', 'Dirt'], 'Limestone');
        cards = [card1, card2, card3]
        deck = new Deck(cards);
    });

    it('Should be able to create a Deck of Cards', () => {
        expect(deck).to.be.instanceOf(Deck);
        expect(deck.cards).to.deep.equal(cards);
    });

    it('Should be able to check on the number of cards in the deck', () => {
        expect(deck.countCards()).to.equal(3);
        cards = [card1, card2]
        deck = new Deck(cards);
        expect(deck.countCards()).to.equal(2);
    });
});
