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
 * @description Generates a sequence of elements composed of 
 * elements of another sequence subject to a transform.
 * 
 * @param {*} selector 
 */
function select(selector) {
  var source = this

  return new Enumerable( 
    function createMoveNext() {
      var enumerator = source[GetEnumerator]()
      var i = 0

      return function moveNext() {
        if (!enumerator[MoveNext]())
          return false
      
        this.current = selector(enumerator[Current], i++)
        return true
      }
    }
  )
}

module[ExportExtension](IEnumerable, select)
