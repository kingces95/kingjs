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
  assert(create({ name: 'Bob' }).name == 'Bob');
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

function bases() {
  var result = create({ }, {
    bases: [ 
      { foo: 0, bar: 1 },
      { foo: 0, baz: 2 },
    ]
  });

  assert(result.foo == 0);
  assert(result.bar == 1);
  assert(result.baz == 2);
}
bases();

function namedBases() {
  var result = create({ }, {
    basePoset: {
      x: { foo: 0, bar: 1 },
      y: { foo: 0, baz: 2 }
    },
    bases: [ 'x', 'y' ]
  });

  assert(result.foo == 0);
  assert(result.bar == 1);
  assert(result.baz == 2);
}
namedBases();

function posetBases() {
  var result = create({ }, {
    basePoset: {
      b: { foo: 0 },
      x$b: { bar: 1 },
      y$b: { baz: 2 }
    },
    bases: [ 'x', 'y' ]
  });

  assert(result.foo == 0);
  assert(result.bar == 1);
  assert(result.baz == 2);
}
posetBases();

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


function wrapThenInherit() {
  var appleName = 'apple';
  var result = create(appleName, {
    wrap: 'name',
    bases: [{
      type: 'fruit',
      name: 'unknown'
    }]
  })

  assert(result.name == 'apple'); // wrap, inherit
  assert(result.type == 'fruit'); // inherit
}
wrapThenInherit();

function inheritThenDefaults() {
  var result = create({ }, {
    defaults: { 
      type: 'unknown',
      color: 'unknown' 
    },
    bases: [{ 
      type: 'fruit',
    }]
  })
  assert(result.type == 'fruit'); // inherit
  assert(result.color == 'unknown'); // defaults
}
inheritThenDefaults(); 