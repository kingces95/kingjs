'use strict';

var makeEnumerable = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

function empty() {
  var sequence = makeEnumerable.call([]);
  assert(sequence instanceof Array);
  assert(Object.isFrozen(sequence) == false);

  var enumerator = sequence.getEnumerator();
  assert(Object.isFrozen(sequence) == true);

  assert(enumerator.current === undefined);
  assert(enumerator.moveNext() === false);
  assert(enumerator.current === undefined);
  assert(enumerator.moveNext() === false);
  assert(enumerator.current === undefined);

  var descriptor = Object.getOwnPropertyDescriptor(sequence, 'getEnumerator');
  assert(descriptor.configurable === false);
  assert(descriptor.enumerable === false);
  assert(descriptor.writable === false);
}
empty();

function singleton() {
  var array = [ 0 ];

  var sequence = makeEnumerable.call(array);
  assert(sequence === array);
  assert(Object.isFrozen(sequence) == false);

  for (var i = 0; i < 2; i ++) {
  var enumerator = sequence.getEnumerator();
    assert(Object.isFrozen(sequence) == true);

    assert(enumerator.current === undefined);
    assert(enumerator.moveNext() === true);
    assert(enumerator.current === 0);
    assert(enumerator.moveNext() === false);
    assert(enumerator.current === undefined);
  }

  var getEnumerator = sequence.getEnumerator;
  var sequence = makeEnumerable.call([0]);
  assert(sequence.getEnumerator === getEnumerator);
}
singleton();