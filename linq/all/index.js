var { 
  ['@kingjs']: {
    reflect: { exportExtension },
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current }
  }
} = require('./dependencies');

/**
 * @description Returns true if all elements of a sequence satisfy a condition.
 * 
 * @param predicate A function to test each element for a condition.
 * 
 * @returns `true` if every element of the source sequence passes the test in the 
 * specified predicate, or if the sequence is empty; otherwise, `false`.
 */
function all(predicate) {
  var enumerator = this[GetEnumerator]();
  while (enumerator[MoveNext]()) {
    if (!predicate(enumerator[Current]))
      return false;
  }
  
  return true;
}

exportExtension(module, IEnumerable, all);