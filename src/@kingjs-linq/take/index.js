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
 * @description Generates a sequence identical to 
 * another sequence up to a specified index.
 * 
 * @param {*} count 
 */
function take(count) {
  var source = this

  return new Enumerable( 
    function createMoveNext() {
      var enumerator = source[GetEnumerator]()
      
      return function moveNext() {    
        if (!enumerator[MoveNext]() || count-- <= 0)
          return false
        
        this.current = enumerator[Current]
        return true
      }
    }
  )
}

module[ExportExtension](IEnumerable, take)
