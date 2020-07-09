var { 
  '@kingjs': {
    Enumerable,
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Generates a sequence of elements composed 
 * of elements of two sequences which share the same index.
 * 
 * @param {*} other 
 * @param {*} result 
 */
function zip(other, result) {
  var source = this

  return new Enumerable( 
    function makeMoveNext() {
      var first = source[GetEnumerator]()
      var second = other[GetEnumerator]()
      
      return function() {    
        if (!first[MoveNext]() || 
          !second[MoveNext]())
          return false
        
        this.current = result(
          first[Current], 
          second[Current])
        return true
      }
    }
  )
}

module[ExportInterfaceExtension](IEnumerable, zip)
