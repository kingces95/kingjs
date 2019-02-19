var { 
  ['@kingjs']: {
    reflect: { 
      exportExtension
    },
    linq: {
      defaultLessThan
    },
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current }
  }
} = require('./dependencies');

/**
 * @description Returns the maximum value in a sequence of values 
 * projected from elements of a sequence.
 * 
 * @param {*} lessThan 
 */
function max(lessThan) {
  if (!lessThan)
    lessThan = defaultLessThan;
  
  var result = undefined
  var enumerator = this[GetEnumerator]();
  if (enumerator[MoveNext]()) {
    result = enumerator[Current];
    
    while (enumerator[MoveNext]()) {
      if (lessThan(result, enumerator[Current]) == true)
        result = enumerator[Current];
    }
  }

  return result;
};

exportExtension(module, IEnumerable, max);
