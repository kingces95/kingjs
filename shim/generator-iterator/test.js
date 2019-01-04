'use strict';
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

function readMe() {
  function* generator() { yield 0; }

  // oddly, a generator is not it's own Symbol.iterator
  assert(!generator[Symbol.iterator]);

  require('.');

  // Shim generators so they implement the Symbol.iterator protocol
  var iterator = generator[Symbol.iterator]();
  assert(iterator);
  
  var next;
  assert(next = iterator.next(), !next.done);
  assert(next.value == 0);
  assert(next = iterator.next(), next.done);
}
readMe();

function testLikeString() {
  var string = '0';
  var iterator = string[Symbol.iterator];
  var iterable = iterator.call(string);
  var next = iterable.next();
  assert(next.value == '0')

  function* generator() { yield 0; };
  var iterator = generator[Symbol.iterator];
  var iterable = iterator.call(generator);
  var next = iterable.next();
  assert(next.value == 0)
}
testLikeString();