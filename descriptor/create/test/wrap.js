'use strict';

var create = require('../index');
var testRequire = require('../..');
var assert = testRequire('@kingjs/assert');

function readMe() {

  var people = {
    alice: { name: 'Alice', age: 21 },
    bob: 'Bob'
  }
  
  for (var name in people)
    people[name] = create(people[name], { wrap: 'name' });
  
  assert(Object.isFrozen(people.alice));
  assert(Object.isFrozen(people.bob));

  assert(people.alice.name == 'Alice');
  assert(people.bob.name == 'Bob');
}
readMe();

function procedural() {
  var descriptor = create('Bob', {
    wrap: o => ({ name: o })
  });

  assert(descriptor.name == 'Bob');
}
procedural();

function noop() {
  assert(create({ name: 'Bob' }).name == 'Bob');
}
noop();

