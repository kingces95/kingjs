var contains = require('./index');
var sequence = require('@kingjs/sequence');
var assert = require('@kingjs/assert');

assert(contains.call(sequence(1, 2, 3), 2));

var people = sequence(
  { name: 'Alice' },
  { name: 'Bob' },
  { name: 'Chris' },
);

var equal = function(l, r) { 
  return l.name == r.name; 
}

assert(contains.call(people, { name: 'Chris' }, equal));