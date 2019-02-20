var decodePoset = require('..');
var Dictionary = require('@kingjs/dictionary');
var assert = require('assert');

// Decode an encoded poset (https://en.wikipedia.org/wiki/Partially_ordered_set) 
// with exported vertices `'a'`, `'b'`, and `'c'` where vertex `'a'` has 
// value `1`, and depends on vertices `'b'` and `'c'` which have values `2` 
// and `3` respectively, and both depend on `'d'` which has value `4`, like 
// this:
var vertices = new Dictionary();

//   a=1
//   / \
// b=2 c=3
//   \ /
//   d=4
var edges = decodePoset.call({
  a$b$c: 1,
  b$d: 2,
  c$d: 3,
  d: 4,
}, vertices);

assert(Object.keys(vertices).length == 4);
assert(vertices.a == 1);
assert(vertices.b == 2);
assert(vertices.c == 3);
assert(vertices.d == 4);

assert(Object.keys(edges).length == 3);

assert(edges.a.length == 2);
assert(edges.a[0] == 'b');
assert(edges.a[1] == 'c');

assert(edges.b.length == 1);
assert(edges.b[0] == 'd');

assert(edges.c.length == 1);
assert(edges.c[0] == 'd');