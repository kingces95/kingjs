var { assert,
  '@kingjs': {
    '-linq': { ToLookup, ToArray },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

function readme() {
  var lookup = [
      { name: 'Alice', pet: 'Fluffy' },
      { name: 'Alice', pet: 'Spike' },
      { name: 'Bob', pet: 'Tiger' }
    ][ToLookup](
    function(x) { return x.name },
    function(x) { return x.pet }
  )
  assert(!('toString' in lookup))
  
  for (var key in lookup)
    lookup[key] = lookup[key][ToArray]()

  assert(Object.keys(lookup).length == 2)
  assert(lookup.Alice[0] == 'Fluffy')
  assert(lookup.Alice[1] == 'Spike')
  assert(lookup.Bob[0] == 'Tiger')
}
readme()

function defaultValueSelector() {
  var lookup = [
      { name: 'Alice', pet: 'Fluffy' },
      { name: 'Alice', pet: 'Spike' },
      { name: 'Bob', pet: 'Tiger' }
    ][ToLookup](
    function(x) { return x.name }
    // default selector
  )
  assert(!('toString' in lookup))
  
  for (var key in lookup)
    lookup[key] = lookup[key][ToArray]()

  assert(Object.keys(lookup).length == 2)
  assert(lookup.Alice[0].pet == 'Fluffy')
  assert(lookup.Alice[1].pet == 'Spike')
  assert(lookup.Bob[0].pet == 'Tiger')
}
defaultValueSelector()
