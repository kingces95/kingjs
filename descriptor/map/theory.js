'use strict';

var map = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

assertTheory(function(test, id) {
  var descriptor = { };
  descriptor[test.key] = test.value;

  if (test.frozen)
    Object.freeze(descriptor);

  var result = map.call(descriptor, function(value, key) {
    assert(key == test.key);
    assert(value === test.value);
    return test.update;
  });

  var copyOnWrite = test.frozen;
  var copied = result !== descriptor;
  var write = test.update !== test.value;

  assert(result[test.key] === test.update);
  assert(copied == (copyOnWrite && write));
  assert(Object.isFrozen(result) == (test.frozen && !write));
}, {
  key: 'foo',
  value: [ undefined, null, 0, 1 ],
  update: [ undefined, null, 0, 1 ],
  frozen: [ false, true ]
})