const data = require('./data');
const prototypeQuestions = data.prototypeData;
const util = require('./util');
const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Round = require('../src/Round');

class Game {
  constructor() {
    this.currentRound = null;
  }

  start() {
    const cards = prototypeQuestions.map(question => new Card(question.id, question.question, question.answers, question.correctAnswer));
    const deck = new Deck(cards);
    this.currentRound = new Round(deck);
    this.printMessage(deck, this.currentRound);
    this.printQuestion(this.currentRound);
  }

  printMessage(deck, round) {
    console.log(`Welcome to FlashCards! You are playing with ${deck.countCards()} cards.
-----------------------------------------------------------------------`)
  }

  printQuestion(round) {
      util.main(round);
  }

  createCards() {
    const cards = prototypeQuestions.map(question => new Card(question.id, question.question, question.answers, question.correctAnswer));
    return cards;
  }

  createDeck(cards) {
    return new Deck(cards);
  }

}

module.exports = Game;
