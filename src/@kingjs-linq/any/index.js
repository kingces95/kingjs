var { 
  ['@kingjs']: {
    reflect: { exportExtension },
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current }
  }
} = require('./dependencies');

/**
 * @description Determines whether a sequence contains any elements that
 * satisfy a predicate.
 * 
 * @this any An `IEnumerable` that contains the elements to which the predicate will be applied.
 * 
 * @param [predicate] A function to test each element for a condition.
 * 
 * @returns `true` if any elements in the source sequence pass the test 
 * in the specified predicate; otherwise, `false`.
 */
function any(predicate) {    
  var enumerator = this[GetEnumerator]();
  while (enumerator[MoveNext]()) {
    if (!predicate || predicate(enumerator[Current]))
      return true;
  }
  
  return false;
};

exportExtension(module, IEnumerable, any);
