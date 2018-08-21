'use strict';

var aggregate = require('@kingjs/linq.aggregate');

function sum() {
  return aggregate.call(this, 0, function(x) { 
    return this + x; 
  });
};

Object.defineProperties(module, {
  exports: { value: sum }
});