'use strict';

var assert = require('assert');
var defineSymbols = require('..');
var is = require('@kingjs/is');
var assertTheory = require('@kingjs/assert-theory');

function readMe() {

  var Scope = defineSymbols('test', {
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

  assert(Symbol.keyFor(Scope) == '@test');

  var symbol = Symbol[Scope];

  var {
    Identity,
    Polymorphisms,
    IIterable,
    IIterable: { Iterator },
    IIdentifiable,
    IIdentifiable: { Identity: IdentityAlso },
    IPolymorphic,
    IPolymorphic: { Polymorphisms: PolymorphismsAlso },
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator,
    IEnumerator: { MoveNext, Current },  
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

assertTheory(function(test, id) {
  //console.log(test);
}, {
  inherited: [ false, true ],
  package: [ false, true ],
  reference: {
    none: 'none',
    name: 'name',
    fullName: 'fullName',
   },
})