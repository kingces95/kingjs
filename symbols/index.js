'use strict';

var initialize = require('./initialize');

var symbol = {
  polymorphisms: null,
  identity: null,

  iterable: {
    iterator: Symbol.iterator,
  },
  identifiable: {
    identity: 'identity',
  },
  polymorphic: {
    polymorphisms: 'polymorphisms',
  },
  enumerable: { 
    getEnumerator: null,
  },
  enumerator: {
    moveNext: null,
    current: null,
  },
};

module.exports = initialize.call(symbol);

var { 
  enumerable: { getEnumerator }
} = symbol;

return;