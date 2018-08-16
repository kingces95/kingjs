'use strict';

var aggregate = require('@kingjs/linq.aggregate');

function defaultSelector(x) {
  return x;
}

function average(selector) {
  if (!selector)
    selector = defaultSelector;

  var result = aggregate.call(this, { 
      count: 0, 
      sum: 0
    }, function(a, o) { 
      a.count++; 
      a.sum += selector(o); 
      return a; 
    }
  );

  return result.sum / result.count;
};

Object.defineProperties(module, {
  exports: { value: average }
});