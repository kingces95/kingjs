'use strict';

var { 
  DefineExtension,
  IEnumerable,
  IEnumerable: { GetEnumerator },
  IEnumerator: { MoveNext, Current }
} = Symbol.kingjs;

function aggregate(seed, aggregator) {
  var enumerator = this[GetEnumerator]();
  
  var result = seed;
  while (enumerator[MoveNext]())
    result = aggregator.call(result, enumerator[Current]);
  
  return result;
};

module.exports = IEnumerable[DefineExtension](aggregate);