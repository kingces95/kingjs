var { 
  '@kingjs': { 
    IIterable: { GetIterator },
    '-linq-static': { fromGenerator } 
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyArray = []

function fromIterable(iterable = EmptyArray) {
  var generator = iterable[GetIterator].bind(iterable)
  return fromGenerator(generator)
}

module.exports = fromIterable