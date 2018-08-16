'use strict';

var concat = require('@kingjs/linq.concat');
var sequence = require('@kingjs/sequence');

function append(value) {    
  return concat.call(this, sequence(value));
};

Object.defineProperties(module, {
  exports: { value: append }
});
