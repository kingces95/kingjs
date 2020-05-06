var { 
  '@kingjs': {
    reflect: { is }
  },
} = module[require('@kingjs-module/dependencies')]();

var constants = {
  zero: () => 0,
  one: () => 1,
  null: () => null,
  undefined: () => undefined,
  true: () => true,
  false: () => false,
}

var DefaultEndlessIterator = (function *() { 
  while (true)
    yield undefined 
})();

/**
 * @description Returns a function that returns `value`. If value 
 * is iterable it's elements are returned after which undefined is
 * returned.
 * 
 * @param value The value to return or an interable.
 * 
 * @returns Returns a function that returns `value` or, if `value`
 * is iterable, than its elements and then undefined.
 * 
 * @remarks The following constants have interned functions: `1`, `0`,
 * `true`, `false`, `null`, `undefined`.
 */
function endless(value) {
  switch (value) {
    case 0: return constants.zero;
    case 1: return constants.one;
    case true: return constants['true'];
    case false: return constants['false'];
    case undefined: return constants.undefined;
    case null: return constants.null;
  }

  if (is.generator(value) || is.asyncGenerator(value))
    return endlessIterator(value);

  if (is.function(value))
    return value;

  return () => value;
}

function endlessIterator(generator) {
  var iterable;
  return function() {
    if (!iterable)
      iterable = generator();

    var next = iterable.next();
    if (next.done)
      iterable = DefaultEndlessIterator;

    return next.value;
  }
}

module.exports = endless;