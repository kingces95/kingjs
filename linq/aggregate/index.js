'use strict';

function aggregate(seed, aggregator) {
  var enumerator = this.getEnumerator();
  
  var result = seed;
  while (enumerator.moveNext())
    result = aggregator.call(result, enumerator.current);
  
  return result;
};

Object.defineProperties(module, {
  exports: { value: aggregate }
});
