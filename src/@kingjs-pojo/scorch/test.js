var { assert,
  '@kingjs': {
    '-pojo': { Scorch }
  }
} = module[require('@kingjs-module/dependencies')]()

var pojo = {
  p0: 0,
  p1: undefined
}

var actual = pojo[Scorch]()
assert.equal(actual, pojo)

var keys = Object.keys(actual)
assert.equal(keys.length, 1)
assert.equal(pojo[keys[0]], 0)