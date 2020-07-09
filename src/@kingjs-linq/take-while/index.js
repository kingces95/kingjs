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
 * @description Generates a sequence identical to another 
 * sequence so long as the elements continue to satisfy 
 * a specified condition.
 * 
 * @param {*} predicate 
 */
function takeWhile(predicate) {
  var source = this
  
  return new Enumerable( 
    function createMoveNext() {
      var enumerator = source[GetEnumerator]()
      var i = 0 
      
      return function moveNext() {    
        
        if (!enumerator[MoveNext]() || 
          !predicate || 
          !predicate(enumerator[Current], i++))
          return false
        
        this.current = enumerator[Current]
        return true
      }
    }
  )
}

module[ExportInterfaceExtension](IEnumerable, takeWhile)
