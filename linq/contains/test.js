var contains = require('.');
var testRequire = require('..');
var sequence = testRequire('@kingjs/enumerable.create');
var assert = testRequire('@kingjs/assert');

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