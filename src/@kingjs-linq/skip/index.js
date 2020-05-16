var { 
  '@kingjs': {
    Enumerable,
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Generates a sequence identical to another sequence 
 * after bypassing a specified number of elements.
 * 
 * @param {*} count 
 */
function skip(count) {
  var source = this

  return new Enumerable( 
    function createMoveNext() {
      var enumerator = source[GetEnumerator]()
      
      return function moveNext() {    
        
        do {      
          if (!enumerator[MoveNext]())
            return false
        } while (count-- > 0)
        
        this.current = enumerator[Current]
        return true
      }
    }
  )
}

module[ExportExtension](IEnumerable, skip)
