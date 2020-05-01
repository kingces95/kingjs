var Copy = require('@kingjs/graph.poset.copy')
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
  x: [ 'f' ],
  d: [ 'e', 'f' ],
  e: [ 'g' ],
  f: [ 'g', 'h' ],
}

assert.deepEqual(
  poset[Copy](), poset
)

assert.deepEqual(
  poset[Copy]([ 'd' ]), {
    d: [ 'e', 'f' ],
    e: [ 'g' ],
    f: [ 'g', 'h' ],
  }
)

assert.deepEqual(
  poset[Copy]([ 'd' ], [ 'g' ]), {
    d: [ 'e', 'f' ],
    e: [ 'g' ],
    f: [ 'g' ],
  }
)

assert.deepEqual(
  poset[Copy]([ 'd' ], [ 'g' ], true), {
    d: [ 'e', 'f' ],
    e: [ 'g' ]
  }
)

assert.deepEqual(
  poset[Copy](null, [ 'd' ]), {
    a: [ 'b', 'c' ],
    b: [ 'd' ],
    c: [ 'd' ],
  }
)