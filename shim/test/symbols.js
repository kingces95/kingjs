'use strict';

var symbol = require('..');
var assert = require('assert');

function readMe() {

  var {
    Identity,
    Polymorphisms,
    
    IIterable,
    IIdentifiable,
    IPolymorphic,
    IEnumerable,
    IEnumerator,
    
    IIterable: { GetIterator },
    IIdentifiable: { Identity: IdentityAlso },
    IPolymorphic: { Polymorphisms: PolymorphismsAlso },
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },  
  } = Symbol.kingjs;

  assert(Symbol.keyFor(Identity) == '@kingjs/Identity');
  assert(Symbol.keyFor(Polymorphisms) == '@kingjs/Polymorphisms');

  assert(IIterable.name == '@kingjs/IIterable');
  assert(IIdentifiable.name == '@kingjs/IIdentifiable');
  assert(IIdentifiable.name == '@kingjs/IIdentifiable');
  assert(IPolymorphic.name == '@kingjs/IPolymorphic');
  assert(IEnumerable.name == '@kingjs/IEnumerable');
  assert(IEnumerator.name == '@kingjs/IEnumerator');

  assert(GetIterator === Symbol.iterator);
  assert(IdentityAlso === Identity);
  assert(PolymorphismsAlso === Polymorphisms);
  assert(Symbol.keyFor(GetEnumerator) == '@kingjs/IEnumerable.GetEnumerator');
  assert(Symbol.keyFor(MoveNext) == '@kingjs/IEnumerator.MoveNext');
  assert(Symbol.keyFor(Current) == '@kingjs/IEnumerator.Current');

  assert(IIdentifiable[Identity] in IPolymorphic[Polymorphisms]);
}
readMe();