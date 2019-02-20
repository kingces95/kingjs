var inherit = require('..');
var assert = require('assert');
var decode = require('@kingjs/poset.decode');

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