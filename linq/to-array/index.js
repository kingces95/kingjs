'use strict';

var aggregate = require('@kingjs/linq.aggregate');

function toArray() {      
  return aggregate.call(this, [], function(a, o) { 
    a.push(o); 
    return a; 
  });
};

Object.defineProperties(module, {
  exports: { value: toArray }
});