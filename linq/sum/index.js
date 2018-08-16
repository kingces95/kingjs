'use strict';

var aggregate = require('@kingjs/linq.aggregate');

function sum() {
  return aggregate.call(this, 0, function(a, o) { 
    return a + o; 
  });
};

Object.defineProperties(module, {
  exports: { value: sum }
});