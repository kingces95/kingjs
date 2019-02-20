var encodePoset = require('..');
var assert = require('assert');

// Encode a poset (https://en.wikipedia.org/wiki/Partially_ordered_set) 
// where vertex `'a'` has value `1` and depends on `'b'` and `'c'` which 
// have values `2` and `3` respectively, and both depend on `'d'` which 
// has value `4`, like this:

//   a=1
//   / \
// b=2 c=3
//   \ /
//   d=4
var poset = encodePoset.call({
  a: [ 'b', 'c' ],
  b: [ 'd' ],
  c: [ 'd' ],
}, {
  a: 1,
  b: 2,
  c: 3,
  d: 4
});

assert(Object.keys(poset).length == 4);
assert(poset.a$b$c == 1);
assert(poset.b$d == 2);
assert(poset.c$d == 3);
assert(poset.d == 4);