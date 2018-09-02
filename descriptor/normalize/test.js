'use strict';

var normalize = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');

function readMe() {

  var people = {
    alice: { name: 'Alice', age: 21 },
    bob: 'Bob'
  }
  
  for (var name in people)
    people[name] = normalize(people[name], 'name');
  
  assert(people.alice.name == 'Alice');
  assert(people.bob.name == 'Bob');
}
readMe();

function procedural() {
  var descriptor = normalize('Bob', o => { 
    return { name: o } 
  });
  assert(descriptor.name == 'Bob');
}
procedural();

function noop() {
  assert(normalize({ name: 'Bob' }).name == 'Bob');
}
noop();

function fail() {
  assertThrows(() => normalize('Bob'));
}
fail();