var { 
  assert,
  '@kingjs': {
    reflect: { is },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Returns a `generator` given an `iterable`.
 * @param value The `generator` or `iterable` to get an `iterator` from.
 * @returns Returns an `iterator`.
 * @remarks Returns a `generator` if passed a `generator`.
 */
function getGenerator(value) {
    
  // function* () { ... }
  if (is.generator(value))
    return value

  // arrays, maps, etc...
  assert.ok(Symbol.iterator in value)
  return value[Symbol.iterator].bind(value)
}

module.exports = getGenerator