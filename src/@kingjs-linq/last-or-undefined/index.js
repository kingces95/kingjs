var { 
  ['@kingjs']: {
    reflect: { 
      exportExtension
    },
    linq: {
      Where
    },
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current }
  }
} = module[require('@kingjs-module/dependencies')]();


/**
 * @description Returns the last element of a sequence 
 * that satisfies a specified condition or a undefined.
 * 
 * @param {*} predicate 
 */
function lastOrUndefined(predicate) {
  var enumerable = this;
      
  if (predicate)
  enumerable = enumerable[Where](predicate);
  
  var enumerator = enumerable[GetEnumerator]();  
  
  var current;
  while (enumerator[MoveNext]())
    current = enumerator[Current];
  
  return current;
};

exportExtension(module, IEnumerable, lastOrUndefined);
