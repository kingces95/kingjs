var { 
  '@kingjs': {
    IEnumerable,
    '-module': { ExportInterfaceExtension },
    '-linq-reduction': { Aggregate }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Creates an array from a `IEnumerable`.
 * 
 * @this any An `IEnumerable` from which to create an array.
 */
function toArray() {      
  return this[Aggregate]([], function(a, x) { 
    a.push(x) 
    return a 
  })
}

module[ExportInterfaceExtension](IEnumerable, toArray)
