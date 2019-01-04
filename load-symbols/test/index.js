'use strict';

var assert = require('assert');
var loadSymbols = require('..');
var is = require('@kingjs/is');

function readMe() {
  var SymbolPrefix = '@test/';
  var target = { };

  var symbol = loadSymbols(target, SymbolPrefix, {
    Polymorphisms: null,
    Identity: null,

    IIterable: {
      members: { Iterator: Symbol.iterator },
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
  });

  var {
    Identity,
    Polymorphisms,
    IIterable: { Iterator },
    IIdentifiable: { Identity: IdentityAlso },
    IPolymorphic: { Polymorphisms: PolymorphismsAlso },
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },  
  } = symbol;

  var {
    IIterable,
    IIdentifiable,
    IPolymorphic,
    IEnumerable,
    IEnumerator
  } = symbol;

  assert(Symbol.keyFor(Identity) == '@test/Identity');
  assert(Symbol.keyFor(Polymorphisms) == '@test/Polymorphisms');

  assert(IIterable.name == '@test/IIterable');
  assert(IIdentifiable.name == '@test/IIdentifiable');
  assert(IIdentifiable.name == '@test/IIdentifiable');
  assert(IPolymorphic.name == '@test/IPolymorphic');
  assert(IEnumerable.name == '@test/IEnumerable');
  assert(IEnumerator.name == '@test/IEnumerator');

  assert(Iterator === Symbol.iterator);
  assert(IdentityAlso === Identity);
  assert(PolymorphismsAlso === Polymorphisms);
  assert(Symbol.keyFor(GetEnumerator) == '@test/IEnumerable.GetEnumerator');
  assert(Symbol.keyFor(MoveNext) == '@test/IEnumerator.MoveNext');
  assert(Symbol.keyFor(Current) == '@test/IEnumerator.Current');
}
readMe();