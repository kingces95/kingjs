var { assert,
  '@kingjs': {
    '-linq': {
      '-reduction': { ToDictionary },
      '-static': { of }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

assert.deepEqual(
  of(
    { name: 'Alice', age: 18 },
    { name: 'Bob', age: 19 },
    { name: 'Chris', age: 20 },
  )[ToDictionary](
    function(x) { return x.name },
    function(x) { return x.age }
  ), {
    Alice: 18,
    Bob: 19,
    Chris: 20
  }
)

assert.deepEqual(
  of(
    { name: 'Alice', age: 18 },
    { name: 'Bob', age: 19 },
    { name: 'Chris', age: 20 },
  )[ToDictionary](
    function(x) { return x.name }
    // test default valueSelector
  ), {
    Alice: { name: 'Alice', age: 18 },
    Bob: { name: 'Bob', age: 19 },
    Chris: { name: 'Chris', age: 20 },
  }
)

assert.throws(() => 
 of(0, 0)[ToDictionary](o => o)
)
