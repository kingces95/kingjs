var assert = require('assert');
var construct = require('..');

var together = construct('kingJs', [['Foo', 'Bar'], ['BaZ']]);
assert(together == '@kingjs/foo-bar.baz');
