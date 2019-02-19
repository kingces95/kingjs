'use strict';

var aggregate = require('@kingjs/linq.aggregate');

/**
 * @description Computes the sum of a sequence of 
 * numbers projected from elements of a sequence.
 */
function sum() {
  return aggregate.call(this, 0, function(x) { 
    return this + x; 
  });
};

Object.defineProperties(module, {
  exports: { value: sum }
});