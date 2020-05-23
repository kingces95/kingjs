var { assert,
  '@kingjs': {
    '-linq': { ThenBy, OrderBy, 
      '-reduction': { ToArray },
    },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

function readme() {
  
  var people = [
    { first: 'Bob', last: 'Smith' },
    { first: 'Alice', last: 'Smith' },
    { first: 'Chris', last: 'King' },
  ]
  
  var lastSelector = function(x) { return x.last }
  var firstSelector = function(x) { return x.first }
  
  var sortedSequence = people[OrderBy](lastSelector)
  sortedSequence = sortedSequence[ThenBy](firstSelector)
 
  var sortedArray = sortedSequence[ToArray]()
  assert(sortedArray[0].last == 'King')
  assert(sortedArray[0].first == 'Chris')
  assert(sortedArray[1].last == 'Smith')
  assert(sortedArray[1].first == 'Alice')
  assert(sortedArray[2].last == 'Smith')
  assert(sortedArray[2].first == 'Bob')
}
readme()
