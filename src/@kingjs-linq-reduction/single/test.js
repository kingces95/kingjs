var { assert,
  '@kingjs': {
    '-linq-reduction': { Single },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

assert([0][Single]() == 0)
assert.throws(function() { 
  [][Single]()
})
assert.throws(function() { 
  [0, 1][Single]()
})

function isOdd(x) {
  return x % 2 == 1 
}

assert([0, 1, 2][Single](isOdd) == 1)
assert.throws(function() { 
  [][Single](isOdd)
})
assert.throws(function() { 
  [0][Single](isOdd)
})
assert.throws(function() { 
  [0, 1, 3][Single](isOdd)
})
