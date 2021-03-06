var { 
  '@kingjs': {
    '-module': { ExportInterfaceExtension },
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current }
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description Returns true if all elements of a sequence satisfy a condition.
 * 
 * @this any An `IEnumerable` that contains the elements to which the predicate will be applied.
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

module[ExportInterfaceExtension](IEnumerable, all)