require('kingjs')
var Contains = require('..');
var assert = require('assert');

assert([1, 2, 3][Contains](2));

var people = [
  { name: 'Alice' },
  { name: 'Bob' },
  { name: 'Chris' },
];

var equal = function(l, r) { 
  return l.name == r.name; 
}

assert(people[Contains]({ name: 'Chris' }, equal));