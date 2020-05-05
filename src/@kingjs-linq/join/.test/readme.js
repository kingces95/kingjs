require('kingjs');
var assert = require('assert');
var Join = require('..');
var ToArray = require('@kingjs/linq.to-array');

function readme() {
  var result = [
      { name: `Alice`, key: 0 },
      { name: `Bob`, key: 1 },
      { name: `Chris`, key: 2 }, // no pets
    ][Join]([
      { name: `Fluffy`, ownerKey: 0 },
      { name: `Spike`, ownerKey: 0 },
      { name: `Snuggles`, ownerKey: 1 },
      { name: `Butch`, ownerKey: 3 }, // no owner
    ],
    function(person) { return person.key; },
    function(animal) { return animal.ownerKey; },
    function(owner, pet) { return owner.name + ' owns ' + pet.name; },
  )
  
  var result = result[ToArray]();

  assert(result.length == 3);
  assert(result[0] == 'Alice owns Fluffy');
  assert(result[1] == 'Alice owns Spike');
  assert(result[2] == 'Bob owns Snuggles');
}
readme();

function readmeFlipped() {
  var result = [
      { name: `Fluffy`, ownerKey: 0 },
      { name: `Spike`, ownerKey: 0 },
      { name: `Snuggles`, ownerKey: 1 },
      { name: `Butch`, ownerKey: 3 }, // no owner
    ][Join]([
      { name: `Alice`, key: 0 },
      { name: `Bob`, key: 1 },
      { name: `Chris`, key: 2 }, // no pets
    ], 
    function(animal) { return animal.ownerKey; },
    function(person) { return person.key; },
    function(owner, pet) { return owner.name + ' is owned by ' + pet.name; },
  )
  
  var result = result[ToArray]();

  assert(result.length == 3);
  assert(result[0] == 'Fluffy is owned by Alice');
  assert(result[1] == 'Spike is owned by Alice');
  assert(result[2] == 'Snuggles is owned by Bob');
}
readmeFlipped();