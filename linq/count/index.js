'use strict';

var aggregate = require('@kingjs/linq.aggregate');

function count(predicate) {      
  return aggregate.call(this, 0, function(x) {
    var aggregate = this;

    if (!predicate || predicate(x))
      aggregate++;
    
    return aggregate; 
  });
};

Object.defineProperties(module, {
  exports: { value: count }
});