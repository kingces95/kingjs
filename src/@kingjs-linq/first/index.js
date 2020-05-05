var { 
  ['@kingjs']: {
    reflect: { exportExtension },
    linq: { Where },
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current }
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description Returns the first element of a sequence 
 * that satisfies a specified condition.
 * 
 * @param {*} predicate 
 */
function first(predicate) {
  var enumerable = this;
  
  if (predicate)
    enumerable = enumerable[Where](predicate);
  
  var enumerator = enumerable[GetEnumerator]();
  
  if (!enumerator[MoveNext]())
    throw 'first: Sequence contains no matching elements.';
  
  return enumerator[Current];
};

exportExtension(module, IEnumerable, first);
