var assert = require('assert');
var join = require('..');

var together = join(['foo', 'bar']);
assert(together == 'fooBar');

var together = join(['foo', 'bar'], true);
assert(together == 'FooBar');

var together = join([]);
assert(together === null);

var together = join(['']);
assert(together === null);