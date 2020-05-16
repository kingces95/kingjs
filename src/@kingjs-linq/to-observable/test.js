var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    '-linq': { ToObservable },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

var result = []
var observable = [0, 1, 2][ToObservable]()
observable[Subscribe](o => result.push(o))
assert.deepEqual(result, [0, 1, 2])