require('kingjs');
var groupJoin = require('..');
var toArray = require('@kingjs/linq.to-array');
var assert = require('assert');

function readme() {
  var owners = sequence(
    { name: 'Alice', id: 0 },
    { name: 'Bob', id: 1 },
    { name: 'Chris', id: 2 },
  );
  
  var pets = sequence(
    { name: 'Fluffy', ownerId: 0 },
    { name: 'Spike', ownerId: 0 },
    { name: 'Snuggles', ownerId: 1 },
  )
  
  var ownersAndPets = groupJoin.call(
    owners,
    pets,
    function(x) { return x.id; },
    function(x) { return x.ownerId; },
    function(x, group) { 
      return {
        owner: x.name,
        pets: toArray.call(group)
      }; 
    }
  );
  
  var result = toArray.call(ownersAndPets);

  assert(result.length == 3);
  assert(result[0].owner == 'Alice');
  assert(result[0].pets.length == 2);
  assert(result[0].pets[0].name == 'Fluffy');
  assert(result[0].pets[0].ownerId == '0');
  assert(result[0].pets[1].name == 'Spike');
  assert(result[0].pets[1].ownerId == '0');
  assert(result[1].owner == 'Bob');
  assert(result[1].pets.length == 1);
  assert(result[1].pets[0].name == 'Snuggles');
  assert(result[1].pets[0].ownerId == '1');
  assert(result[2].owner == 'Chris');
  assert(result[2].pets.length == 0);
}
readme();
