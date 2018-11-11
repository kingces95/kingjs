'use strict';

var write = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var freeze = testRequire('@kingjs/descriptor.object.freeze');
var isFrozen = testRequire('@kingjs/descriptor.object.is-frozen');

function readMe() {
  var target = { foo: 0 };

  function setAFewProperties(value) {
    assert(value == target);

    // write treats value as if it were frozen => arguments are never mutated
    // Object.freeze(value);
  
    // this will not clone value if foo is already 0
    var value0 = write.call(value, 'foo', 0);
    assert(value0 == target);
  
    // this will clone value0 if bar is not already 1
    var value1 = write.call(value0, 'bar', 1);
    assert(value1 != target);
  
    // this call will not clone value1 if value1 was cloned above
    var value2 = write.call(value1, 'baz', 2);
    assert(value2 == value1);
  
    // value will have been cloned at most once
  
    // freeze value before exposing to users
    var value3 = freeze.call(value2);
    assert(value3 == value2);
    assert(Object.isFrozen(value3));

    return value3;
  }
  
  // target is born frozen
  var bornFrozen = isFrozen.call(target);
  assert(bornFrozen);

  var result = setAFewProperties(target);

  assert(result != target);
  assert(result.foo == 0);
  assert(result.bar == 1);
  assert(result.baz == 2);
}
readMe();


require('./theory');