var { assert,
  '@kingjs': {
    '-linq': {
      '-reduction': { Min },
      '-static': { of }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

assert.equal(of(1, 2, 3)[Min](), 1)
assert.deepEqual(
  of(
    { name: 'Alice', age: 18 },
    { name: 'Bob', age: 19 },
    { name: 'Chris', age: 19 },
  )[Min]((l, r) => l.age < r.age),
  { name: 'Alice', age: 18 }
)