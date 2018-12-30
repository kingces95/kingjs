'use strict';

var aggregate = require('@kingjs/linq.aggregate');
var { define } = require('@kingjs/linq.define');

function defaultSelector(x) {
  return x;
}

define(module, 'exports', function average(selector) {
  if (!selector)
    selector = defaultSelector;

  var result = this[aggregate]({ 
      count: 0, 
      sum: 0
    }, function(x) { 
      this.count++; 
      this.sum += selector(x);
      return this;
    }
  );

  return result.sum / result.count;
})