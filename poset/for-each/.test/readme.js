var forEach = require('..');
var assert = require('assert');

var poset = {
  a: [ 'b', 'c' ],
  b: [ 'd' ],
  c: [ 'd' ]
};

var totalOrder = [];

forEach.call(poset, function(vertex) {
  totalOrder.push(vertex);
});

assert(totalOrder.length == 4);
assert(totalOrder[0] == 'd');
assert(totalOrder[3] == 'a');

assert(totalOrder[1] != totalOrder[2]);
assert(totalOrder[1] == 'b' || totalOrder[1] == 'c');
assert(totalOrder[2] == 'b' || totalOrder[2] == 'c');
