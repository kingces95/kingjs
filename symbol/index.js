//'use strict';

var defineSymbols = require('./define-symbols');
var SymbolPrefix = '@kingjs/';

var symbol = {
  polymorphisms: null,
  identity: null,

  IIterable: {
    members: { iterator: Symbol.iterator },
  },
  IIdentifiable: {
    members: { identity: 'identity' },
  },
  IPolymorphic: {
    extends: [ 'IIdentifiable' ],
    members: { polymorphisms: 'polymorphisms' },
  },
  IEnumerable: {
    members: { getEnumerator: null },
  },
  IEnumerator: {
    members: {
      moveNext: null,
      current: null,
    },
  },
};

defineSymbols(exports, SymbolPrefix, symbol);