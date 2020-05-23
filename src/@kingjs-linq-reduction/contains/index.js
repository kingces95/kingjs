var { 
  '@kingjs': {
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },
    '-interface': { ExportExtension },
    '-linq-static': { defaultEqual },
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * 
 * @description Returns true if a sequence contains 
 * a specified element.
 */
function contains(value, equal) {
  var enumerator = this[GetEnumerator]();
  
  if (!equal)
    equal = defaultEqual;
  
  while (enumerator[MoveNext]()) {
    if (equal(value, enumerator[Current]))
      return true;
  }
  
  return false;
};

module[ExportExtension](IEnumerable, contains);
