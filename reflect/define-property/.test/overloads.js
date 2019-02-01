var assert = require('assert');
var defineProperty = require('..');

var target = null;
var foo = function foo() { };
var bar = function bar() { };

// create descriptor by harvesting name from named function
assert.deepEqual(
  defineProperty(null, foo ), 
  { name: 'foo', descriptor: { value: foo } }
)
// create descriptor by harvesting name from descriptor value
assert.deepEqual(
  defineProperty(null, { value: foo, enumerable: true } ), 
  { name: 'foo', descriptor: { value: foo, enumerable: true } }
)

// create descriptor by harvesting name from descriptor getter
assert.deepEqual(
  defineProperty(null, { get: foo, enumerable: true } ), 
  { name: 'foo', descriptor: { get: foo, enumerable: true } }
)

// create descriptor by harvesting name from descriptor getter
assert.deepEqual(
  defineProperty(null, { set: foo, enumerable: true } ), 
  { name: 'foo', descriptor: { set: foo, enumerable: true } }
)

// create descriptor by harvesting name from descriptor getter
assert.deepEqual(
  defineProperty(null, { get: foo, set: bar, enumerable: true } ), 
  { name: 'foo', descriptor: { get: foo, set: bar, enumerable: true } }
)

// create descriptor with number
assert.deepEqual(
  defineProperty(null, 'foo', 0), 
  { name: 'foo', descriptor: { value: 0 } }
)

// create descriptor with symbol
assert.deepEqual(
  defineProperty(null, 'foo', Symbol.iterator), 
  { name: 'foo', descriptor: { value: Symbol.iterator } }
)

// create descriptor with string
assert.deepEqual(
  defineProperty(null, 'foo', 'bar'), 
  { name: 'foo', descriptor: { value: 'bar' } }
)

// create descriptor with function
assert.deepEqual(
  defineProperty(null, 'foo', foo), 
  { name: 'foo', descriptor: { value: foo } }
)

// create descriptor with boolean
assert.deepEqual(
  defineProperty(null, 'foo', true), 
  { name: 'foo', descriptor: { value: true } }
)