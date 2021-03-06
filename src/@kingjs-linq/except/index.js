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
 * @description Generates the set difference of two sequences.
 * 
 * @param {*} enumerable 
 * @param {*} idSelector 
 */
function except(
  enumerable, 
  idSelector) {

  if (!idSelector)
    idSelector = defaultSelector
  var source = this

  return new Enumerable( 
    function createMoveNext() {
      var enumerator = source[GetEnumerator]()
      var visited = new Dictionary()
      var exceptions

      return function moveNext() { 

        while (true) {
          if (!enumerator[MoveNext]()) 
            return false

          var value = enumerator[Current]
          var id = idSelector(value)

          // exclude duplicates
          if (id in visited)
            continue
          visited[id] = undefined

          if (enumerable) {
            
            if (!exceptions) {
              exceptions = new Dictionary()
              var exceptEnumerator = enumerable[GetEnumerator]()
              while (exceptEnumerator[MoveNext]())
                exceptions[idSelector(exceptEnumerator[Current])] = undefined
            }
            
            // exclude exceptions
            if (id in exceptions)
              continue
          }
          
          this.current = value
          return true
        }
      }
    }
  )
}

module[ExportInterfaceExtension](IEnumerable, except)