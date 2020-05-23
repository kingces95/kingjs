var { 
  '@kingjs': {
    IEnumerable,
    '-interface': { ExportExtension },
    '-linq-reduction': { Aggregate }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Creates an array from a `IEnumerable`.
 * 
 * @this any An `IEnumerable` from which to create an array.
 */
function toArray() {      
  return this[Aggregate]([], function(x) { 
    this.push(x) 
    return this 
  })
}

module[ExportExtension](IEnumerable, toArray)
