var { assert,
  '@kingjs': {
    '-linq': { SelectMany, SequenceEqual, ToArray },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

function readme() {
  var peopleAndPets = [
    { name: 'Alice', pets: ['Tiger', 'Butch'] },
    { name: 'Bob', pets: ['Spike', 'Fluffy'] }
  ]

  var petOwners = peopleAndPets[SelectMany](
    function(x, i) { 
      assert(x.name != 'Alice' || i == 0)
      assert(x.name != 'Bob' || i == 1)
      return x.pets 
    },
    function(x, p) { return x.name + ' owns ' + p }
  )

  petOwners = petOwners[ToArray]()

  assert(
    petOwners[SequenceEqual]([
      'Alice owns Tiger', 
      'Alice owns Butch', 
      'Bob owns Spike', 
      'Bob owns Fluffy'
    ])
  )
}
readme()

function flatten() {
  var result = [[0, 1],[2, 3]][SelectMany]()
  result = result[ToArray]()
  assert(result[SequenceEqual]([0, 1, 2, 3]))
}
flatten()