'use strict';

var {
  '@kingjs/define-interface': defineInterface,
  '@kingjs/define-symbols': defineSymbols,
} = require('@kingjs/require-packages').call(module);

var {
  Identity,
  Polymorphisms,
  IInterface,
  IIdentifiable,
  IPolymorphic
} = defineInterface;

defineSymbols('kingjs', {
  Identity,
  Polymorphisms,
  IInterface,
  IIdentifiable,
  IPolymorphic,

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
