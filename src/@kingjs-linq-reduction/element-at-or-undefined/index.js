var { 
  '@kingjs': {
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * 
 * @description Returns the element at a specified index in a 
 * sequence or undefined if the index is out of range.
 * 
 * @param {*} index 
 */
function elementAtOrDefault(index) {
  if (index < 0)
    throw "elementAt: index < 0"

    var enumerator = this[GetEnumerator]()
  
  var current = 0

  while (enumerator[MoveNext]()) {
    if (current++ == index)
    return enumerator[Current]
  }
}

module[ExportInterfaceExtension](IEnumerable, elementAtOrDefault)