var { assert,
  '@kingjs': {
    '-linq': { Zip, 
      '-reduction': { ToArray },
    },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

function readme() {
  
  var result = [0, 1, 2][Zip](
    [`a`, `b`],
    function(n, l) { 
      return { number: n, letter: l } 
    }
  )
  
  var result = result[ToArray]()

  assert(result.length == 2)
  assert(result[0].number == 0)
  assert(result[0].letter == 'a')
  assert(result[1].number == 1)
  assert(result[1].letter == 'b')
}
readme()

function readmeFlipped() {
  
  var result = [`a`, `b`][Zip](
    [0, 1, 2],
    function(l, n) { 
      return { number: n, letter: l } 
    }
  )
  
  var result = result[ToArray]()

  assert(result.length == 2)
  assert(result[0].number == 0)
  assert(result[0].letter == 'a')
  assert(result[1].number == 1)
  assert(result[1].letter == 'b')
}
readmeFlipped()