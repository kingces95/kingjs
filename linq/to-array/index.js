'use strict';

var aggregate = require('@kingjs/linq.aggregate');

function toArray() {      
  return aggregate.call(this, [], function(x) { 
    this.push(x); 
    return this; 
  });
};

Object.defineProperties(module, {
  exports: { value: toArray }
});