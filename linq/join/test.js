var join = require('./index');
var sequence = require('@kingjs/sequence');
var toArray = require('@kingjs/linq.to-array');
var assert = require('@kingjs/assert');

function readme() {
  var result = join.call(
    sequence(
      { name: `Alice`, key: 0 },
      { name: `Bob`, key: 1 },
      { name: `Chris`, key: 2 }, // no pets
    ), 
    sequence(
      { name: `Fluffy`, ownerKey: 0 },
      { name: `Spike`, ownerKey: 0 },
      { name: `Snuggles`, ownerKey: 1 },
      { name: `Butch`, ownerKey: 3 }, // no owner
    ),
    function(person) { return person.key; },
    function(animal) { return animal.ownerKey; },
    function(owner, pet) { return owner.name + ' owns ' + pet.name; },
  )
  
  var result = toArray.call(result);

  assert(result.length == 3);
  assert(result[0] == 'Alice owns Fluffy');
  assert(result[1] == 'Alice owns Spike');
  assert(result[2] == 'Bob owns Snuggles');
}
readme();

function readmeFlipped() {
  var result = join.call(
    sequence(
      { name: `Fluffy`, ownerKey: 0 },
      { name: `Spike`, ownerKey: 0 },
      { name: `Snuggles`, ownerKey: 1 },
      { name: `Butch`, ownerKey: 3 }, // no owner
    ),
    sequence(
      { name: `Alice`, key: 0 },
      { name: `Bob`, key: 1 },
      { name: `Chris`, key: 2 }, // no pets
    ), 
    function(animal) { return animal.ownerKey; },
    function(person) { return person.key; },
    function(owner, pet) { return owner.name + ' is owned by ' + pet.name; },
  )
  
  var result = toArray.call(result);

  assert(result.length == 3);
  assert(result[0] == 'Fluffy is owned by Alice');
  assert(result[1] == 'Spike is owned by Alice');
  assert(result[2] == 'Snuggles is owned by Bob');
}
readmeFlipped();