var {
  '@kingjs': { 
    reflect: { 
      implementIEnumerable,
      implementInterface 
    },
    Generator, 
    IIterable, 
    IIterable: { GetIterator }, 
  }
} = module[require('@kingjs-module/dependencies')]()

implementInterface(
  Generator.prototype, 
  IIterable, {
    getIterator() { return this() }
  }
)

implementIEnumerable(
  Generator.prototype, 
  function createMoveNext(instance) {
    var iterator = null

    return function moveNext() {
      if (!iterator) {
        var iterable = instance()
        iterator = iterable[GetIterator]()
      }
      var next = iterator.next()
      this.current_ = next.value
      return !next.done
    }
  }
)