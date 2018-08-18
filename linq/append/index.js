'use strict';

var concat = require('@kingjs/linq.concat');
var sequence = require('@kingjs/enumerable.create');

function append(value) {    
  return concat.call(this, sequence(value));
};

Object.defineProperties(module, {
  exports: { value: append }
});
