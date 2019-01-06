'use strict';

var {
  '@kingjs/define-interface': defineInterface,
  '@kingjs/define-symbols': defineSymbols,
} = require('@kingjs/require-packages').call(module);

var {
  IInterface,
  IIdentifiable,
  IPolymorphic
} = defineInterface;

Symbol.kingjs = {
  IIdentifiable,
  IPolymorphic,  
}

defineSymbols(Symbol, 'kingjs', {
  IIdentifiable,
  Identity,

  IPolymorphic,
  Polymorphisms,

  IInterface,

  IIterable: {
    members: { GetIterator: Symbol.iterator },
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
});
