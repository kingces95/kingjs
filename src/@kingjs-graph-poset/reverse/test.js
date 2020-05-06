var { assert,
  '@kingjs': {
    '-graph-poset': { Reverse },
  }
} = module[require('@kingjs-module/dependencies')]()

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