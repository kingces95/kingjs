var { 
  ['@kingjs']: {
    reflect: { exportExtension },
    IEnumerable,
  }
} = require('./dependencies');

var EmptyArray = [];

/**
 * @description Returns an empty sequence.
 */
function empty() { return EmptyArray; }

module.exports = empty;