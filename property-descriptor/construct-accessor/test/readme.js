var constructAccessor = require('..');
var assert = require('assert')

var target = { };
var get = function foo() { }
var set = function foo() { }
var bar = 'bar';

function assertConstruction(construction, expectedName) {
  var { target, name, descriptor } = construction;
  assert(target == target);
  assert(name == expectedName);
  assert(descriptor.get == get);
  assert(descriptor.set == set);
}

// 1. Named Functions
// constructAccessor(target, namedGetter, namedSetter)
var construction = constructAccessor(target, get, set);
assertConstruction(construction, get.name);

// 2. Name + Anonymous Functions
// constructAccessor(target, name, getter, setter)
var construction = constructAccessor(target, bar, get, set);
assertConstruction(construction, bar);

// 3. Descriptor Composed of Named Functions
// constructAccessor(target, { namedGetter, namedSetter })
var construction = constructAccessor(target, { get, set });
assertConstruction(construction, get.name);

// 4. Name + Descriptor Composed of Anonymous Functions
// constructAccessor(target, name, { getter, setter })
var construction = constructAccessor(target, bar, { get, set });
assertConstruction(construction, bar);
