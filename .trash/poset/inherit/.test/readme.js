var inherit = require('..');
var assert = require('assert');
var decode = require('@kingjs/poset.decode');

// Create descriptors of the tire counts of `car`, 
//`truck`, and `bigRig` by inheriting common 
// properties from `vehicle` like this:
var decodeAndInherit = function(encodedPoset) {
  var vertices = { };
  var poset = decode.call(encodedPoset, vertices);
  return inherit.call(poset, vertices);
}

var vehicleDescriptors = {
  car$vehicle: { },
  truck$vehicle: { },
  bigRig$vehicle: { tires: 18 },
  vehicle: { tires: 4 }
};

var result = decodeAndInherit(vehicleDescriptors);

assert(Object.keys(result).length == 4);
assert(result.car.tires == 4);
assert(result.truck.tires == 4);
assert(result.bigRig.tires == 18);
assert(result.vehicle.tires == 4);

// Given a poset (https://en.wikipedia.org/wiki/Partially_ordered_set) 
// composed of vertex 
// - `'A'` with property `'a'` that depends on 
// - `'B'` and `'C'` with properties `'b'` and `'c'` respectively and 
// which both depend on 
// - `'D'` with property `'d'`.

// Assume all properties have value `0`. Now, 
// - have `'B'` and `'C'` inherit `'D'`'s properties and 
// - `'A'` inherit `'B'` and `'C'`'s properties
//   - as well as `'D'`'s properties transitively, 

// like this:
var inherit = require('@kingjs/poset.inherit');
var decode = require('@kingjs/poset.decode');

var decodeAndInherit = function(encodedPoset) {
  var vertices = { };
  var poset = decode.call(encodedPoset, vertices);
  return inherit.call(poset, vertices);
}

//     A={a:0}             A={a:0,b:0,c:0,d:0}
//     /     \                   /     \
// B={b:0}  C={c:0}  ->  B={b:0,d:0}  C={c:0,d:0}
//     \     /                   \     /
//     D={d:0}                   D={d:0}
decodeAndInherit({
  A$B$C: { a:0 },
  B$D: { b:0 },
  C$D: { c:0 },
  D: { d:0 },
});

// {
//   A: { a:0, b:0, c:0, d:0 },
//   B: { b:0, d:0 },
//   C: { c:0, d:0 },
//   D: { d:0 }
// }