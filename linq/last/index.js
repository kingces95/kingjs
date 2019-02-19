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
} = require('./dependencies');

/**
 * @description Returns the last element of a sequence that 
 * satisfies a specified condition.
 * 
 * @param {*} predicate 
 */
function last(predicate) {
  var enumerable = this;
      
  if (predicate)
    enumerable = enumerable[Where](predicate);
  
  var enumerator = enumerable[GetEnumerator]();  
  
  if (!enumerator[MoveNext]())
    throw 'last: Sequence contains no matching elements.';

  var current = enumerator[Current];
  while (enumerator[MoveNext]())
    current = enumerator[Current];
  
  return current;
};

exportExtension(module, IEnumerable, last);
