var { assert,
  '@kingjs': {
    '-linq': {
      '-reduction': { Max },
      '-static': { of }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

assert.equal(of(1, 2, 3)[Max](), 3)
assert.deepEqual(
  of(
    { name: 'Alice', age: 18 },
    { name: 'Bob', age: 19 },
    { name: 'Chris', age: 19 },
  )[Max]((l, r) => l.age < r.age),
  { name: 'Bob', age: 19 }
)