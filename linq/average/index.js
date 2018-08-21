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
    }, function(x) { 
      this.count++; 
      this.sum += selector(x);
      return this;
    }
  );

  return result.sum / result.count;
};

Object.defineProperties(module, {
  exports: { value: average }
});