var ToTree = require('@kingjs/graph.poset.to-tree')
var Print = require('@kingjs/graph.tree.print')
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

var tree = poset[ToTree]()
tree[Print]()

assert.deepEqual(tree, {
  a: [ 'b', 'c' ],
  b: [ 'd' ],
})

console.log('---')

//    a
//   / \
//  b   c
//   \ / \
//    d   x
//   / \ /
//  e   f
//   \ / \
//    g   h

var poset = {
  a: [ 'b', 'c' ],
  b: [ 'd' ],
  c: [ 'd', 'x' ],
  d: [ 'e', 'f' ],
  e: [ 'g' ],
  f: [ 'g', 'h' ],
  x: [ 'f' ]
}

poset[ToTree]()
  [Print]()

console.log('---')

var target = 'e'

poset[ToTree]({ 
  roots: [ target ],
})[Print]()

console.log('---')

poset[ToTree]({ 
  leafs: [ target ],
})[Print]()

// var maxDepth = 3
// poset[Reduce](function(_, vertex, stack) {
//   console.log(' '.repeat(maxDepth - stack.length) + vertex)
// }, null, { 
//   leafs: [ target ] 
// })