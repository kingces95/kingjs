var { assert,
  '@kingjs': {
    '-graph-poset': { Add }
  }
} = module[require('@kingjs-module/dependencies')]()

//    a
//   /
//  b 
//   \
//    d
var poset = {
  a: [ 'b' ],
  b: [ 'd' ],
}

//    a
//   / \
//  b   c
//   \ /
//    d
assert.deepEqual(poset[Add]({
  a: ['c'],
  c: ['d']
}), {
  a: [ 'b', 'c' ],
  b: [ 'd' ],
  c: [ 'd' ],
})