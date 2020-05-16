var {
  '@kingjs': { 
    IIterable, 
    IEnumerable, 
    Enumerator,
    '-generator': { Generator }, 
    '-module': { ExportShim },
  }
} = module[require('@kingjs-module/dependencies')]()

module[ExportShim](IEnumerable, Generator, {
  getEnumerator() {
    var container = this
    return new Enumerator(
      function createMoveNext() {
        var iterator = null
    
        return function moveNext() {
          if (!iterator) {
            var iterable = container()
            iterator = iterable[IIterable.GetIterator]()
          }

          var next = iterator.next()
          this.current = next.value
          return !next.done
        }
      }
    )
  }
})