'use strict';

var update = require('.');
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
  
  var result = update.call(descriptor, invoke);
  assert(result.foo == 1);
  assert(result.bar == 2);
}
readMe();

assertTheory(function(test, id) {
  var descriptor = { };
  descriptor[test.key] = test.value;

  if (test.frozen)
    Object.freeze(descriptor);

  var thisArg = { };

  var result = update.call(descriptor, function(value, key) {
    assert(key == test.key);
    assert(value === test.value);
    assert(this === thisArg);
    return test.update;
  }, thisArg);

  var copyOnWrite = test.frozen;

  assert(result[test.key] === test.update);

  var copied = result !== descriptor;
  assert(copied ==
    (test.update !== test.value && copyOnWrite)
  )

  assert(Object.isFrozen(result) == (!copied && test.frozen));
}, {
  key: 'foo',
  value: [ undefined, null, 0, 1 ],
  update: [ undefined, null, 0, 1 ],
  frozen: [ false, true ]
})