var assert = require('assert');
var defineField = require('..');

var target = defineField({ }, 'foo', { value: 1 })
assert.deepEqual(target.foo, { value: 1 });