var assert = require('assert');

var update = require('..');
var assertTheory = require('@kingjs/assert-theory');
var isFrozen = require('@kingjs/descriptor.object.is-frozen');

assertTheory(function(test, id) {
  var target = { };
  target[test.key] = test.value;

  var thisArg = { };

  var result = update.call(target, function(value, key) {
    assert(key == test.key);
    assert(value === test.value);
    assert(this === thisArg);
    return test.update;
  }, thisArg);

  assert(Object.isFrozen(result));
  assert(isFrozen.call(result));
  assert(target instanceof Array == result instanceof Array);
  assert(target[test.key] === test.value);
  assert(result[test.key] === test.update);

  var copied = result !== target;
  var written = test.update !== test.value;
  assert(copied == written);
}, {
  key: 'foo',
  defined: [ true, false ],
  value: [ undefined, null, 0, 1 ],
})