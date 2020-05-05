var assert = require('assert');
var defineFunction = require('..');

var target = defineFunction({ bar: 1 }, 'foo', 'this.bar');
assert(target.foo() == 1);