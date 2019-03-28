var {
  ['@kingjs']: { 
    rx: { Subject },
    Generator,
    IObserver: { Next, Complete, Error }
  },
} = require('./dependencies');

function create(callback) {
  return new Subject(callback);
}

module.exports = create;