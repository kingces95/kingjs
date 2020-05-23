var { assert,
  '@kingjs': {
    '-linq': { 
      '-reduction': { ToArray },
      '-static': { empty }
    },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

var array = empty()[ToArray]()
assert.equal(array.length, 0)