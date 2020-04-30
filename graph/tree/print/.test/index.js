var assert = require('assert')
var Print = require('..')

//       r
//    /     \
//   b       c
//  / \     / \
// d   e   f   h
// |
// g 

var tree = {
  'A': [ 'AA', 'AB', 'AC', 'AD' ],
  'AA': [ '0', '1' ],
  'AB': [ '2', 'ABA' ],
  'ABA': [ '3', '4' ],
  'ACA': [ '5', '6' ],
  'AC': [ 'ACA', '7' ],
  'AD': [ '8', '9' ],
}
tree[Print]({ roots: 'A' })

console.log('---')
tree[Print]({
  preOrder: [ 'AC', 'AD' ],
  postOrder: [ 'AA', 'AB' ],
  inOrder: ['A', 'ACA', 'ABA' ],
})

console.log('---')
var multiTree = {
  'A': [ 'a0', 'a1' ],
  'B': [ 'b0', 'b1' ],
  'C': [ 'c0', 'CA' ],
  'CA': [ 'c1', 'c2' ],
}
multiTree[Print]()

