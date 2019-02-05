var assert = require('assert');

var update = require('..');
var isFrozen = require('@kingjs/descriptor.object.is-frozen');
var clone = require('@kingjs/descriptor.object.clone');

function readMe() {
  function invoke(value, key) {
    assert(key == 'foo' || key == 'bar');
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

function precondition() {
  var thawed = clone.call({ });
  assert(!isFrozen.call(thawed));
  assert.throws(() => update.call(thawed));
}
precondition();

require('./theory');