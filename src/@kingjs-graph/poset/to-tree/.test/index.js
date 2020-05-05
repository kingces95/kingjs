var ToTree = require('@kingjs/graph.poset.to-tree')
var Print = require('@kingjs/graph.tree.print')
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

var tree = poset[ToTree]()
assert.deepEqual(tree[Print](), [
  '   ┌──▌  d',
  '┌──▌  b',
  '▌  a',
  '└──▌  c',
])

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

var tree = poset[ToTree]()
assert.deepEqual(tree[Print](), [
  '         ┌──▌  g',
  '      ┌──▌  e',
  '   ┌──▌  d',
  '   │  │  ┌──▌  h',
  '   │  └──▌  f',
  '┌──▌  b',
  '▌  a',
  '│  ┌──▌  x',
  '└──▌  c',
])

var tree = poset[ToTree]('e')
assert.deepEqual(tree[Print](), [
  '┌──▌  g',
  '▌  e'
])
