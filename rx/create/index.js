var {
  ['@kingjs']: { 
    rx: { 
      Subject,
    },
    Generator,
  },
} = require('./dependencies');

function create(callback) {
  return new Subject(callback);
}

module.exports = create;