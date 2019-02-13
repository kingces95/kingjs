var contains = require('..');
var assert = require('assert');

assert(contains.call([1, 2, 3], 2));

var people = [
  { name: 'Alice' },
  { name: 'Bob' },
  { name: 'Chris' },
];

var equal = function(l, r) { 
  return l.name == r.name; 
}

assert(contains.call(people, { name: 'Chris' }, equal));