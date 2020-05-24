var { assert,
  '@kingjs': {
    '-linq': { Where, 
      '-reduction': { ToArray },
    },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

function readme() {
  var numbers = [0, 1, 2, 3]

  var isEven = function (x) { return x % 2 == 0 }

  var evenNumbers = numbers[Where](isEven)

  var result = evenNumbers[ToArray]()
  assert(result.length == 2)
  assert(result[0] == 0)
  assert(result[1] == 2)
}
readme()

function readmeIndex() {
  var letters = ['a', 'b', 'c', 'd']

  var isEvenIndex = function (x, i) { return i % 2 == 0 }
  
  var everyOther = letters[Where](isEvenIndex)
  
  var result = everyOther[ToArray]()
  assert(result.length == 2)
  assert(result[0] == 'a')
  assert(result[1] == 'c')
}
readmeIndex()