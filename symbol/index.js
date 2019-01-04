'use strict';

var {
  '@kingjs/load-symbols': loadSymbols,
} = require('@kingjs/require-packages').call(module);

var SymbolPrefix = '@kingjs/';

var symbol = {
  Polymorphisms: null,
  Identity: null,

  IIterable: {
    members: { GetIterator: Symbol.iterator },
  },
  IIdentifiable: {
    members: { Identity: 'Identity' },
  },
  IPolymorphic: {
    extends: [ 'IIdentifiable' ],
    members: { Polymorphisms: 'Polymorphisms' },
  },
  IEnumerable: {
    members: { GetEnumerator: null },
  },
  IEnumerator: {
    members: {
      MoveNext: null,
      Current: null,
    },
  },
};

loadSymbols(exports, SymbolPrefix, symbol);