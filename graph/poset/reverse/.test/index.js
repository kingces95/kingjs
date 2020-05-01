var Reverse = require('@kingjs/graph.poset.reverse')
var assert = require('assert')

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

//    d
//   / \
//  b   c
//   \ /
//    a
var rPoset = poset[Reverse]()
assert.deepEqual(rPoset, { 
  d: [ 'b', 'c' ],
  b: [ 'a' ], 
  c: [ 'a' ] 
})