var {
  ['@kingjs']: { 
    rx: { 
      Subject,
    }
  },
} = require('./dependencies');

function create(callback) {
  return new Subject(callback);
}

module.exports = create;