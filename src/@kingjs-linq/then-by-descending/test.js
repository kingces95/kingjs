var { assert,
  '@kingjs': {
    '-linq': { ThenByDescending, OrderByDescending, 
      '-aggregate': { ToArray },
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
  
  var sortedSequence = people[OrderByDescending](lastSelector)
  sortedSequence = sortedSequence[ThenByDescending](firstSelector)
 
  var sortedArray = sortedSequence[ToArray]()
  assert(sortedArray[2].last == 'King')
  assert(sortedArray[2].first == 'Chris')
  assert(sortedArray[1].last == 'Smith')
  assert(sortedArray[1].first == 'Alice')
  assert(sortedArray[0].last == 'Smith')
  assert(sortedArray[0].first == 'Bob')
}
readme()
