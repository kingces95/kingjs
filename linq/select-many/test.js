var selectMany = require('./index');
var assert = require('@kingjs/assert');
var sequence = require('@kingjs/sequence');
var sequenceEqual = require('@kingjs/linq.sequence-equal');
var toArray = require('@kingjs/linq.to-array');

function readme() {
  var peopleAndPets = sequence(
    { name: 'Alice', pets: sequence('Tiger', 'Butch') },
    { name: 'Bob', pets: sequence('Spike', 'Fluffy') }
  );

  var petOwners = selectMany.call(
    peopleAndPets,
    function(x, i) { 
      assert(x.name != 'Alice' || i == 0);
      assert(x.name != 'Bob' || i == 1);
      return x.pets; 
    },
    function(x, p) { return x.name + ' owns ' + p; }
  )

  var debug = toArray.call(petOwners);

  assert(
    sequenceEqual.call(
      petOwners,
      sequence(
        'Alice owns Tiger', 
        'Alice owns Butch', 
        'Bob owns Spike', 
        'Bob owns Fluffy'
      )
    )
  )
}
readme();

function flatten() {
  var result = selectMany.call(
    sequence(
      sequence(0, 1),
      sequence(2, 3)
    )
  );

  var debug = toArray.call(result);

  assert(
    sequenceEqual.call(
      result,
      sequence(0, 1, 2, 3)
    )
  )
}
flatten();