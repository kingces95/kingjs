'use strict';

var map = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

function readMe() {
  function invoke(value, key) {
    return value + 1;
  }
  
  var descriptor = {
    foo: 0,
    bar: 1,
  }
  
  var result = map.call(descriptor, invoke);
  assert(result.foo == 1);
  assert(result.bar == 2);
}
readMe();

assertTheory(function(test, id) {
  var descriptor = { };
  descriptor[test.key] = test.value;

  if (test.frozen)
    Object.freeze(descriptor);

  var result = map.call(descriptor, function(value, key) {
    assert(key == test.key);
    assert(value === test.value);
    return test.update;
  }, test.copyOnWrite);

  assert(
    Object.isFrozen(descriptor) ==
    Object.isFrozen(result)
  );

  var copyOnWrite = test.copyOnWrite || test.frozen;

  assert(result[test.key] === test.update);

  assert(
    (result === descriptor) ==
    (test.update === test.value || !copyOnWrite)
  )
}, {
  key: 'foo',
  value: [ undefined, null, 0, 1 ],
  update: [ undefined, null, 0, 1 ],
  copyOnWrite: [ false, true ],
  frozen: [ false, true ]
})