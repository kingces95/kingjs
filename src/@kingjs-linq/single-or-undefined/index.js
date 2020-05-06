var { 
  '@kingjs': {
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
 * @description Returns the only element of a sequence that 
 * satisfies a specified condition, or undefined.
 * 
 * @param {*} predicate 
 */
function singleOrUndefined(predicate) {
  var enumerable = this;
  
  if (predicate)
    enumerable = enumerable[Where](predicate);
  
  var enumerator = enumerable[GetEnumerator]();
  
  if (!enumerator[MoveNext]())
    return undefined;
  
  var result = enumerator[Current];
  
  if (enumerator[MoveNext]())
    result = undefined;
  
  return result;
};

exportExtension(module, IEnumerable, singleOrUndefined);
