var { 
  '@kingjs': {
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Returns the element at a specified 
 * index in a sequence.
 * 
 * @param {*} index 
 */
function elementAt(index) {
  if (index < 0)
    throw "elementAt: index < 0"

  var enumerator = this[GetEnumerator]()
  
  var current = 0

  while (enumerator[MoveNext]()) {
    if (current++ == index)
      return enumerator[Current]
  }

  throw "elementAt: sequence.count() => " + current + 
    " < index => " + index
}

module[ExportExtension](IEnumerable, elementAt)