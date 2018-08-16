'use strict';

var aggregate = require('@kingjs/linq.aggregate');

function count(predicate) {      
  return aggregate.call(this, 0, function(a, o) {
    if (!predicate || predicate(o))
      a++;
    
    return a; 
  });
};

Object.defineProperties(module, {
  exports: { value: count }
});