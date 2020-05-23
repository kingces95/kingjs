var { assert,
  '@kingjs': {
    '-linq': { Intersect, 
      '-reduction': { ToArray },
    },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

function readme() {
  var result = [0, 0, 1, 2][Intersect]([1, 0])
  
  var result = result[ToArray]()

  assert(result.length == 2)
  assert(result[0] == 0)
  assert(result[1] == 1)
}
readme()

function readmeFlipped() {
  var result = [1, 0][Intersect]([0, 0, 1, 2])
  
  var result = result[ToArray]()

  assert(result.length == 2)
  assert(result[1] == 0)
  assert(result[0] == 1)
}
readmeFlipped()