var assert = require('assert');

var {
  ['@kingjs']: { is }
} = require('./dependencies');

var unresolvedError = 'External callback returned undefined value.';

/**
 * @description Create a descriptor by delegating creation to a
 * a callback which is passed the `name` and `target` of the property
 * being defined.
 * 
 * @param callback Returns a a descriptor given `name` and `target`.
 * @param name The name of property being described.
 * @param target The target on which the property is defined.
 * 
 * @returns A descriptor created based on `name` and `target`.
 * 
 * @callback
 * @param name The name of property being described.
 * @param target The target on which the property is defined.
 * 
 * @remarks The implementation is trivial but the concept of a property
 * being completely defined by a name plus metadata attached to the target
 * is quite powerful. It allows a mini declarative DSL to be created 
 * and expressed as attributes attached to functions.
 */
function createFromContext(callback, name, target) {
  var result = callback(name, target);
  assert(!is.undefined(result), unresolvedError)
  return result;
}

module.exports = createFromContext;