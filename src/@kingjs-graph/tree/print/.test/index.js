var assert = require('assert')
var Print = require('..')

//   A
//  / \
// B   1
//  \
//   0

var tree = {
  'A': [ 'B', '1' ],
  'B': [ '0' ],
}

assert.deepEqual(tree[Print](), [
  '   ┌──▌  0',
  '┌──▌  B',
  '▌  A',
  '└──▌  1'
])

assert.deepEqual(
  tree[Print](), 
  tree[Print]({ roots: 'A', inOrder: 'A' }), 
)

assert.deepEqual(tree[Print]({ roots: 'B' }), [
  '┌──▌  0',
  '▌  B',
])

assert.deepEqual(tree[Print]({ postOrder: 'A' }), [
  '   ┌──▌  0',
  '┌──▌  B',
  '├──▌  1',
  '▌  A'
])

assert.deepEqual(tree[Print]({ preOrder: 'A' }), [
  '▌  A',
  '├──▌  B',
  '│  └──▌  0',
  '└──▌  1'
])

assert.deepEqual(tree[Print]({ preOrder: 'A', postOrder: 'B' }), [
  '▌  A',
  '│  ┌──▌  0',
  '├──▌  B',
  '└──▌  1',
])

var tree = {
  'Z': [ 'a' ],
  'A': [ 'B', '1' ],
  'B': [ '0' ],
}
tree[Print]({ postOrder: null })

assert.deepEqual(tree[Print](), [
  '┌──▌  a',
  '▌  Z',
  '   ┌──▌  0',
  '┌──▌  B',
  '▌  A',
  '└──▌  1',
])