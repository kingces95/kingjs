var Reduce = require('@kingjs/graph.poset.reduce')
var assert = require('assert')

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

var target = 'e'

poset[Reduce](function(_, vertex, stack) {
  console.log(' '.repeat(stack.length) + vertex)
}, null, { 
  roots: [ target ],
})

console.log('---')

var maxDepth = 3
poset[Reduce](function(_, vertex, stack) {
  console.log(' '.repeat(maxDepth - stack.length) + vertex)
}, null, { 
  leafs: [ target ] 
})
