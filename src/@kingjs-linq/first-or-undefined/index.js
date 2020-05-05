var { 
  ['@kingjs']: {
    reflect: { exportExtension },
    linq: { Where },
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current }
  }
} = require('./dependencies');

/**
 * @description Returns the first element of a sequence 
 * that satisfies a specified condition or a undefined.
 * 
 * @param {*} predicate 
 */
function firstOrUndefined(predicate) {
  var enumerable = this;
  
  if (predicate)
    enumerable = enumerable[Where](predicate);
  
  var enumerator = enumerable[GetEnumerator]();
  
  if (!enumerator[MoveNext]())
    return undefined;
  
  return enumerator[Current];
};

exportExtension(module, IEnumerable, firstOrUndefined);
