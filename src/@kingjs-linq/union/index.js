var { 
  '@kingjs': {
    Dictionary,
    Enumerable,
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

function defaultSelector(x) {
  return x
}

/**
 * @description Generates the set union of two sequences.
 * 
 * @param {*} second 
 * @param {*} idSelector 
 */
function union(
  second, 
  idSelector) {
  
  var first = this

  return new Enumerable( 
    function makeMoveNext() {

      if (!idSelector)
        idSelector = defaultSelector

      var firstEnumerator = first[GetEnumerator]()
      var secondEnumerator = second[GetEnumerator]()
      
      var set = new Dictionary()
      
      return function moveNext() { 
        
        while (firstEnumerator && firstEnumerator[MoveNext]()) {
          var current = firstEnumerator[Current]

          var id = idSelector(current)
          if (id in set)
            continue
          set[id] = undefined

          this.current = current
          return true
        }
        firstEnumerator = null
        
        while (secondEnumerator && secondEnumerator[MoveNext]()) {   
          var current = secondEnumerator[Current]

          var id = idSelector(current)
          if (id in set)
            continue
          set[id] = undefined

          this.current = current
          return true
        }
        secondEnumerator = null
        
        return false
      }
    }
  )
}

module[ExportInterfaceExtension](IEnumerable, union)
