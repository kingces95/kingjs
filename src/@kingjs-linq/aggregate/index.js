var { 
  ['@kingjs']: {
    reflect: { exportExtension },
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current }
  }
} = require('./dependencies');

/**
 * @description Applies an accumulator function over a sequence. 
 * The specified seed value is used as the initial accumulator value, 
 * and the specified function is used to select the result value.
 * 
 * @this any An `IEnumerable` over which to aggregate.
 * 
 * @param seed The initial accumulator value.
 * @param aggregator An accumulator function toı be invoked on each element.
 * @param selector A function to transform the final accumulator value 
 * into the result value.
 * 
 * @returns The transformed final accumulator value.
 */
function aggregate(seed, aggregator, selector) {
  var enumerator = this[GetEnumerator]();
  
  var result = seed;
  while (enumerator[MoveNext]())
    result = aggregator.call(result, enumerator[Current]);
  
  if (selector)
    result = selector(result);

  return result;
};

exportExtension(module, IEnumerable, aggregate);
