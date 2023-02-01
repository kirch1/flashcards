const chai = require('chai');
const assert = chai.assert;

const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Round = require('../src/Round');

describe('Round', () => {
    let card1, card2, card3, deck, round;
    beforeEach(() => {
        card1 = new Card(1, 'At what temperature does water boil?', ['212 F', '100 F', '32 F', '99 C'], '212 F');
        card2 = new Card(2, 'What is the largest desert on Earth?', ['Mojave', 'Antarctica', 'Sahara', 'Gobi'], 'Antarctica');
        card3 = new Card(3, 'What is chalk made of?', ['Flour', 'Limestone', 'Egg Shells', 'Dirt'], 'Limestone');
        deck = new Deck([card1, card2, card3]);
        round = new Round(deck);
    });

    it('Should be able to create a Round with a Deck', () => {
        assert.instanceOf(round, Round);
        assert.deepEqual(round.deck, deck);
    });

    it('Should be able to return the current card', () => {
        assert.deepEqual(round.returnCurrentCard(), deck.cards[0]);
    });

    it('Should keep tack of the number of turns', () => {
        assert.equal(round.turns, 0);
        round.takeTurn('212 F');
        round.takeTurn('Mojave');
        round.takeTurn('Limestone');
        assert.equal(round.turns, 3);
    });
    
    it('The next card should become the current card after a turn', () => {
        assert.deepEqual(round.returnCurrentCard(), card1);
        round.takeTurn('212 F');
        assert.deepEqual(round.returnCurrentCard(), card2);
        round.takeTurn('Mojave');
        assert.deepEqual(round.returnCurrentCard(), card3);
        round.takeTurn('Limestone');
        assert.deepEqual(round.returnCurrentCard(), card1);
    });

    it('Should return a result string after taking a turn', () => {
        assert.equal(round.takeTurn('212 F'), 'correct!');
        assert.equal(round.takeTurn('Mojave'), 'incorrect!');
        assert.equal(round.takeTurn('Limestone'), 'correct!');
    });

    it('Should record incorrect guesses', () => {
        round.takeTurn('100 F');
        assert.equal(round.incorrectGuesses[0], card1.id);
        round.takeTurn('Mojave');
        assert.equal(round.incorrectGuesses[1], card2.id);
        round.takeTurn('Flour');
        assert.equal(round.incorrectGuesses[2], card3.id);
    });

    it('Should be able to calculate the percent correct', () => {
        round.takeTurn('212 F');
        assert.equal(round.calculatePercentCorrect(), 100);
        round.takeTurn('Mojave');
        assert.equal(round.calculatePercentCorrect(), 50);
        round.takeTurn('Limestone');
        assert.equal(round.calculatePercentCorrect(), 67);
    });

    it('Should be able to get result after ending the round', () => {
        round.takeTurn('212 F');
        round.takeTurn('Mojave');
        round.takeTurn('Limestone');
        assert.equal(round.endRound(), '** Round over! ** You answered 67% of the questions correctly!');
    });
});
