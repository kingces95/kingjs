var { assert,
  '@kingjs': { 
    '-graph-poset': { Reduce }
  }
} = module[require('@kingjs-module/dependencies')]()

var poset = {
  a: [ 'b' ],
  b: [ 'c' ],
  c: [ 'a' ],
};

assert.throws(() => poset[Reduce]())