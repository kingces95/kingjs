var {
  ['@kingjs']: { 
    rx: { Subject },
  },
} = require('./dependencies');

function create(observer) {
  return new Subject(observer);
}

module.exports = create;