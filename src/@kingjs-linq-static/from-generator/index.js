var { 
  '@kingjs': {
    IIterable: { GetIterator },
    Enumerable
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyGenerator = function*() { }

function fromGenerator(generator = EmptyGenerator) {
  return new Enumerable(
    function createMoveNext() {
      var iterator = null

      return function moveNext() {
        if (!iterator)
          iterator = generator()

        var next = iterator.next()
        this.current = next.value
        return !next.done
      }
    }
  )
}

module.exports = fromGenerator