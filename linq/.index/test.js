'use strict';

var linq = require('.');


var assert = require('assert');
require('kingjs');
var apply = require('@kingjs/apply');

var people = sequence(
  { firstName: 'Bob', lastName: 'Smith', id: 0 },
  { firstName: 'Alice', lastName: 'Smith', id: 1 },
  { firstName: 'Chris', lastName: 'King', id: 2 },
);

var pets = sequence(
  { name: 'Tiger', type: 'dog', ownerId: 0 },
  { name: 'Spike', type: 'dog', ownerId: 0 },
  { name: 'Fluffy', type: 'cat', ownerId: 1 },
  { name: 'Bubbles', type: 'fish', ownerId: 2 },
);

var result = apply.call(people,
  linq.orderBy, [ function(x) { return x.lastName; } ],
  linq.thenBy, [ function(x) { return x.firstName; } ],
  linq.join, [
    pets, 
    function(x) { return x.id; },
    function(x) { return x.ownerId; },
    function(owner, pet) { return { owner: owner, pet: pet } }
  ],
  linq.where, [ function(x) { return x.pet.type != 'fish'; } ],
  linq.select, [
    function(x) { 
      var owner = x.owner;
      var pet = x.pet;

      return owner.firstName + " " + owner.lastName + 
        ' owns a ' + pet.type + ' named ' + pet.name + '.';
    },
  ],
  linq.toArray, [],
  Array.prototype.join, ['\n']
);

assert(result == 
  "Alice Smith owns a cat named Fluffy.\n" +
  "Bob Smith owns a dog named Tiger.\n" +
  "Bob Smith owns a dog named Spike."
);