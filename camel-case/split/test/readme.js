var assert = require('assert');
var split = require('..');

var apart = split('fooBar');
assert(apart.length == 2);
assert(apart[0] = 'foo');
assert(apart[1] = 'bar');

var apart = split('FooBar');
assert(apart.length == 2);
assert(apart[0] = 'foo');
assert(apart[1] = 'bar');

var apart = split('FBar');
assert(apart.length == 2);
assert(apart[0] = 'f');
assert(apart[1] = 'bar');

var apart = split('');
assert(apart.length == 0);
