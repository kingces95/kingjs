var { assert,
  '@kingjs': {
    identity
  }
} = module[require('@kingjs-module/dependencies')]()

var o = { }
assert.equal(o, identity(o))