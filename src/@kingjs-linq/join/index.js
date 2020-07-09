var { 
  '@kingjs': {
    Enumerable,
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },
    '-module': { ExportInterfaceExtension },
    '-linq-reduction': { ToLookup },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Generates a sequence of elements composed of elements 
 * from two sequences that share a common key.
 * 
 * @param {*} innerEnumerable 
 * @param {*} outerKeySelector 
 * @param {*} innerKeySelector 
 * @param {*} resultSelector 
 */
function join(
  innerEnumerable, 
  outerKeySelector, 
  innerKeySelector, 
  resultSelector) {

  var outerEnumerable = this

  return new Enumerable( 
    function createMoveNext() {
      
      var outerEnumerator = undefined
      var innerLookup = undefined

      var innerEnumerator = undefined
      var outerCurrent = undefined
      
      return function moveNext() { 
        
        if (!outerEnumerator)
          outerEnumerator = outerEnumerable[GetEnumerator]()
        
        if (!innerLookup) 
          innerLookup = innerEnumerable[ToLookup](innerKeySelector)
        
        while (true) {
          
          // find outer element with matching inner enumerable
          while (!innerEnumerator) {

            if (!outerEnumerator[MoveNext]())
              return false
            
            outerCurrent = outerEnumerator[Current]
            
            var key = outerKeySelector(outerCurrent)
            innerEnumerable = innerLookup[key]  
            if (!innerEnumerable)
              continue

            innerEnumerator = innerEnumerable[GetEnumerator]()
          }
          
          // test if matches exhausted
          if (!innerEnumerator[MoveNext]()) {
            innerEnumerator = undefined
            continue
          }
          
          // yield match
          this.current = resultSelector(outerCurrent, innerEnumerator[Current])
          return true
        }
      }
    }
  )
}

module[ExportInterfaceExtension](IEnumerable, join)
