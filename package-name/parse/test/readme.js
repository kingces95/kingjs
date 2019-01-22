var assert = require('assert');
var parse = require('..');

var apart = parse('@kingjs/foo-bar.baz');
assert(apart.scope == 'kingjs');
assert(apart.fullName == 'foo-bar.baz');

assert(apart.names.length == 2);
assert(apart.names[0] == 'foo-bar');
assert(apart.names[1] == 'baz');

assert(apart.parts.length == 2);
assert(apart.parts[0].length == 2);
assert(apart.parts[1].length == 1);
assert(apart.parts[0][0] == 'foo');
assert(apart.parts[0][1] == 'bar');
assert(apart.parts[1][0] == 'baz');


var apart = parse('foo-bar.baz');
assert(!apart.scope);
assert(apart.fullName == 'foo-bar.baz');

var apart = parse('Bad-Name');
assert(apart === undefined);