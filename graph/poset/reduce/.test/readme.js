var Reduce = require('..')
var assert = require('assert')

// Given a poset (https://en.wikipedia.org/wiki/Partially_ordered_set) 
// where `'a'` depends on `'b'` and `'c'` which, in turn, both depend 
// on `'d'` generate a total ordering like this:

//    a
//   / \
//  b   c
//   \ /
//    d
var poset = {
  a: [ 'b', 'c' ],
  b: [ 'd' ],
  c: [ 'd' ],
}

var totalOrder = poset[Reduce]((a, v) => a.push(v))

assert(totalOrder.length == 4)
assert(totalOrder[0] == 'd')
assert(totalOrder[1] != totalOrder[2])
assert(totalOrder[1] == 'b' || totalOrder[1] == 'c')
assert(totalOrder[2] == 'b' || totalOrder[2] == 'c')
assert(totalOrder[3] == 'a')