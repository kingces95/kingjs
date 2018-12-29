'use strict';

var { define, getEnumerator, moveNext, current } = require('@kingjs/linq.define');

define(module, 'exports', function aggregate(seed, aggregator) {
  var enumerator = this[getEnumerator]();
  
  var result = seed;
  while (enumerator[moveNext]())
    result = aggregator.call(result, enumerator[current]);
  
  return result;
});