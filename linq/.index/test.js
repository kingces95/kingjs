'use strict';

require('./aggregate/test');
require('./all/test');
require('./any/test');
require('./append/test');
require('./average/test');
require('./concat/test');
require('./contains/test');
require('./count/test');
require('./default-equal/test');
require('./default-less-than/test');
require('./distinct/test');
require('./element-at/test');
require('./element-at-or-undefined/test');
require('./empty/test');
require('./except/test');
require('./first/test');
require('./first-or-undefined/test');
require('./group-by/test');
require('./group-join/test');
require('./intersect/test');
require('./join/test');
require('./last/test');
require('./last-or-undefined/test');
require('./max/test');
require('./min/test');
require('./order-by/test');
require('./order-by-descending/test');
require('./prepend/test');
require('./range/test');
require('./repeat/test');
require('./select/test');
require('./select-many/test');
require('./sequence-equal/test');
require('./single/test');
require('./single-or-undefined/test');
require('./skip/test');
require('./skip-while/test');
require('./sum/test');
require('./take/test');
require('./take-while/test');
require('./then-by/test');
require('./then-by-descending/test');
require('./to-array/test');
require('./to-dictionary/test');
require('./to-lookup/test');
require('./union/test');
require('./where/test');
require('./zip/test');

var linq = require('.');
var assert = require('@kingjs/assert');
var sequence = require('@kingjs/enumerable.create');
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

var result = apply(people,
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