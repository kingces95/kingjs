var { 
  ['@kingjs']: {
    reflect: { exportExtension },
    IEnumerable,
  }
} = require('./dependencies');

var EmptyArray = [];

function empty() { return EmptyArray; }

module.exports = empty;