var Add = require('@kingjs/graph.poset.add')
var Reverse = require('@kingjs/graph.poset.reverse')
var ToTree = require('@kingjs/graph.poset.to-tree')
var Print = require('@kingjs/graph.tree.print')
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
//   / \
//  i   j

var poset = {
  a: [ 'b', 'c' ],
  b: [ 'd' ],
  c: [ 'd', 'x' ],
  d: [ 'e', 'f' ],
  e: [ 'g' ],
  f: [ 'g', 'h' ],
  x: [ 'f' ],
  g: [ 'i', 'j' ]
}

var rPoset = poset[Reverse]()

var targetDependencies = poset[ToTree]({ roots: 'e' })
var targetDependents = rPoset[ToTree]({ roots: 'e' })
var tree = targetDependencies[Add](targetDependents)

assert.deepEqual(tree[Print]({
    inOrder: 'e',
    preOrder: 'd',
    postOrder: 'g'
  }), [
  '   ┌──▌  i',
  '   ├──▌  j',
  '┌──▌  g',
  '▌  e',
  '└──▌  d',
  '   ├──▌  b',
  '   │  └──▌  a',
  '   └──▌  c'
])