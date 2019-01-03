'use strict';

var symbol = require('..');
var assert = require('assert');
var is = require('@kingjs/is');

var {
  identity,
  polymorphisms,
  IIterable: { iterator },
  IIdentifiable: { identity: identityAlso },
  IPolymorphic: { polymorphisms: polymorphismsAlso },
  IEnumerable: { getEnumerator },
  IEnumerator: { moveNext, current },  
} = symbol;

var {
  IIterable,
  IIdentifiable,
  IPolymorphic,
  IEnumerable,
  IEnumerator
} = symbol;

function readMe() {
  assert(identity);
  assert(polymorphisms);
  assert(iterator === Symbol.iterator);
  assert(identityAlso === identity);
  assert(polymorphismsAlso === polymorphisms);
  assert(getEnumerator);
  assert(moveNext);
  assert(current);

  assert(is.function(IIterable));
  assert(is.function(IIdentifiable));
  assert(is.function(IPolymorphic));
  assert(is.function(IEnumerable));
  assert(is.function(IEnumerator));

  assert(IIdentifiable[identity] in IPolymorphic[polymorphisms]);
}
readMe();