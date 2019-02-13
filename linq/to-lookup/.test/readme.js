require('kingjs');
var toLookup = require('..');
var toArray = require('@kingjs/linq.to-array');
var assert = require('assert');

function readme() {
  var lookup = toLookup.call(
    sequence(
      { name: 'Alice', pet: 'Fluffy' },
      { name: 'Alice', pet: 'Spike' },
      { name: 'Bob', pet: 'Tiger' }
    ),
    function(x) { return x.name; },
    function(x) { return x.pet; }
  )
  assert(!('toString' in lookup));
  
  for (var key in lookup)
    lookup[key] = toArray.call(lookup[key]);

  assert(Object.keys(lookup).length == 2);
  assert(lookup.Alice[0] == 'Fluffy');
  assert(lookup.Alice[1] == 'Spike');
  assert(lookup.Bob[0] == 'Tiger');
}
readme();

function defaultValueSelector() {
  var lookup = toLookup.call(
    sequence(
      { name: 'Alice', pet: 'Fluffy' },
      { name: 'Alice', pet: 'Spike' },
      { name: 'Bob', pet: 'Tiger' }
    ),
    function(x) { return x.name; }
    // default selector
  )
  assert(!('toString' in lookup));
  
  for (var key in lookup)
    lookup[key] = toArray.call(lookup[key]);

  assert(Object.keys(lookup).length == 2);
  assert(lookup.Alice[0].pet == 'Fluffy');
  assert(lookup.Alice[1].pet == 'Spike');
  assert(lookup.Bob[0].pet == 'Tiger');
}
defaultValueSelector();
