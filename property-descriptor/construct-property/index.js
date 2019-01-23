var assert = require('assert');

var {
  ['@kingjs']: { is }
} = require('./dependencies');

/**
 * @description Construct an object `{ target, name, descriptor: { value } }`
 * where name and value are harvested from a named function or are passed
 * separately where if value is an object it's copied else it's is wrapped.
 * 
 * @param target The target on which the property will be declared.
 * @param x See the example for a list of overrides.
 * @param [y] See the example for a list of overrides.
 * 
 * @returns An object with `{ target, name, descriptor: { value } }` properties
 * where the descriptor properties are harvested from the arguments.
 */
function createProperty(target, x, y) {
  var name, descriptor;

  // e.g. function foo() { ... } => 'foo', function foo() { ... }
  if (is.namedFunction(x)) {
    name = x.name;
    descriptor = { 
      function: true,
      value: x 
    };
  }

  else {
    name = x;
    assert(is.stringOrSymbol(name))

    // e.g. 'foo', 'this.bar' => 'foo', { value: 'this.bar' }
    // e.g. 'foo', function() { ... } => 'foo', { value: function() { ... } }
    // e.g. 'foo', true => 'foo', { value: true }
    if (!is.object(y))
      descriptor = { value: y };

    // e.g. 'foo', { ... }
    else
      descriptor = { ...y };
  }

  return { target, name, descriptor };
}

module.exports = createProperty;
