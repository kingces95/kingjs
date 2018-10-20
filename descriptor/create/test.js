'use strict';

var create = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

function readMe() {
  var frozenDescriptor = Object.freeze({ 
    name: 'Chris',
    age: 20
  });
  
  var clone = create(frozenDescriptor);
  assert(clone.name == 'Chris');
  assert(clone.age == 20);

  clone.age = 21;

  assert(frozenDescriptor.age == 20);
  assert(clone.age == 21);
}
readMe();

function prototype() {
  var obj = { };
  var clone = create(obj);
  assert(Object.getPrototypeOf(clone) !== obj);
}
prototype();

function hidden() {
  var obj = { };
  Object.defineProperty(obj, 'value', {
    value: 0,
    enumerable: false
  });
  Object.freeze(obj);
  var clone = create(obj);

  assert(!Object.isFrozen(clone));
  assert(Object.getOwnPropertyDescriptor(clone, 'value') === undefined);
}
hidden();

function set() {
  var obj = { value_: 0 };
  Object.defineProperty(obj, 'value', {
    set: function(value) { this.value_ = value; },
    get: function() { return this.value_; },
    enumerable: true
  });
  assert(obj.value === 0);
  Object.freeze(obj);

  var clone = create(obj);
  assert(!Object.isFrozen(clone));

  assert(Object.getOwnPropertyDescriptor(
    clone, 'value').value === 0);
}
set();
