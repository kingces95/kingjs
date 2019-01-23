var {
  ['@kingjs']: { is }
} = require('./dependencies');

/**
 * @description Construct an object `{ target, name, descriptor: { get, set } }`
 * where `name`, `get`, and `set` are harvested from named functions, or 
 * are passed separately as a string and functions, or as a string and an object.

 * @param target The target on which the property will be declared.
 * @param x See the example for a list of overrides.
 * @param [y] See the example for a list of overrides.
 * @param [z] See the example for a list of overrides.
 * 
 * @returns An object with `{ target, name, descriptor: { value } }` properties
 * where the descriptor properties are harvested from the arguments.
 */
function constructAccessor(target, x, y, z) {
  var name, descriptor;

  // e.g. { get: function foo() { ... } } => 'foo', { get: function foo() { ... } }
  if (is.object(x))
    descriptor = { ...x };
  
  else if (!is.object(y)) {

    // e.g. 'foo', function() { ... } => 'foo', { get: function() { ... } }
    // e.g. 'foo', 'this.bar' => 'foo', { get: function() { return this.bar; } }
    if (is.stringOrSymbol(x)) {
      name = x;
      descriptor = { get: y, set: z }
    }

    // e.g. function foo() { ... } => 'foo', { get: function foo() { ... } }
    else 
      descriptor = { get: x, set: y }
  }
 
  // e.g. 'foo', { get: function() { ... } }
  // e.g. 'foo', { get: 'this.bar' } => 'foo', { get: function() { ... } }
  else {
    var name = x;
    descriptor = { ...y };
  }  

  // normalize name
  if (!is.stringOrSymbol(name))
    name = (descriptor.get || descriptor.set).name;

  return { target, name, descriptor };
}

module.exports = constructAccessor;