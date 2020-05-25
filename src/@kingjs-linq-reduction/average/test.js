var { assert,
  '@kingjs': {
    '-linq': {
      '-reduction': { Average },
      '-static': { of }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

assert.equal(of(2)[Average](), 2)
assert.equal(of(1, 2, 3)[Average](), 2)
assert.equal(of(-2, 0, 2)[Average](), 0)
assert.equal(
  of({ value: -1 }, { value: 1 })[Average](
    function (x) { return x.value }
  ), 0
)

assert(Number.isNaN(of()[Average]()))