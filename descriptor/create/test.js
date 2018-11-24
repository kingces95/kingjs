'use strict';

var create = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');
var is = testRequire('@kingjs/is');

function empty() {
  assert(is.object(create()));
}
empty();

function fail() {
  assertThrows(() => create('Bob'));
}
fail();

function noop() {
  var descriptor = { name: 'Bob' };
  assert(create(descriptor) == descriptor);
}
noop();

function wrapDeclarative() {

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
wrapDeclarative();

function wrapProcedural() {
  var descriptor = create('Bob', {
    wrap: o => ({ name: o })
  });

  assert(descriptor.name == 'Bob');
}
wrapProcedural();

function defaults() {
  var result = create({ }, {
    defaults: {
      foo: 0,
      bar: 1,
      baz: 2
    }
  });

  assert(result.foo == 0);
  assert(result.bar == 1);
  assert(result.baz == 2);
}
defaults();

function wrapThenDefaults() {
  var appleName = 'apple';
  var result = create(appleName, {
    wrap: 'name',
    defaults: { 
      type: 'fruit',
      name: 'unknown' 
    }
  })

  assert(result.name == 'apple'); 
  assert(result.type == 'fruit'); 
}
wrapThenDefaults();
