var assert = require('assert');

var {
  ['@kingjs']: { is }
} = require('./dependencies');

/**
 * @description Construct an object `{ target, name, descriptor }`
 * where name and descriptor value are harvested from arguments 
 * `x` and `y` depending on their type.
 * 
 * @param target The target on which the property will be declared.
 * @param x See the example for a list of overrides.
 * @param [y] See the example for a list of overrides.
 * 
 * @returns An object with `{ target, name, descriptor }` properties
 * where the descriptor properties are harvested from the arguments.
 * 
 * @remarks - If `x` is a named function then `name` is the function name 
 * `descriptor` is `{ value }` where `value` is the function. 
 * @remarks - Else, if `x` is a string then `name` is `x` and
 * @remarks   - if `y` is an non-null object then `descriptor` is `y`
 * @remarks   - else `descriptor` is `{ value: y }`.
 */
function createProperty(target, x, y) {
  var name, descriptor;

  // e.g. function foo() { ... } => 'foo', function foo() { ... }
  if (is.namedFunction(x)) {
    descriptor = { value: x }
    name = x.name;
  }

  // e.g. { get: function foo() { ... } } => 'foo', { get: function foo() { ... } }
  // e.g. { set: function foo() { ... } } => 'foo', { set: function foo() { ... } }
  // e.g. { value: function foo() { ... } } => 'foo', { value: function foo() { ... } }
  else if (is.object(x)) {
    descriptor = { ...x };
    name = (descriptor.get || descriptor.set || descriptor.value).name;
  }

  else {
    assert(is.stringOrSymbol(x))
    name = x;

    // e.g. 'foo', 'bar' => 'foo', { value: 'bar' }
    // e.g. 'foo', true => 'foo', { value: true }
    // e.g. 'foo', 0 => 'foo', { value: 0 }
    // e.g. 'foo', function() { ... } => 'foo', { value: function() { ... } }
    if (!is.object(y))
      descriptor = { value: y };

    // e.g. 'foo', { ... }
    else
      descriptor = { ...y };
  }

  return { target, name, descriptor };
}

module.exports = createProperty;
