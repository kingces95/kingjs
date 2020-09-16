var { assert,
  '@kingjs': { 
    IEnumerable,
    IIterable,
    '-generator': { Generator },
    '-linq-static': { fromIndexable, fromIterable, fromGenerator } 
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyArray = []

function from(o = EmptyArray) {
  if (o instanceof Array || typeof o == 'string')
    return fromIndexable(o)

  if (o instanceof Generator)
    return fromGenerator(o)

  if (o instanceof IIterable)
    return fromIterable(o)

  assert(o instanceof IEnumerable)
  return o
}

module.exports = from