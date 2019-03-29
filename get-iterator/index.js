var { 
  assert,
  ['@kingjs']: {
    reflect: { is },
  }
} = require('./dependencies');

/**
 * @description Returns an `iterator` given a `generator` or an `iterable`.
 * 
 * @param value The `generator` or `iterable` to get an `iterator` from.
 * 
 * @returns Returns an `iterator`.
 */
function getIterator(value) {

  // arrays, maps, etc...
  if (Symbol.iterator in value)
    return value[Symbol.iterator].bind(value);
    
  // function* () { ... }
  if (is.generator(value))
    return value();

  assert.fail();
}

module.exports = getIterator;