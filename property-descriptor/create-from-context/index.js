var assert = require('assert');

var {
  ['@kingjs']: { is }
} = require('./dependencies');

var unresolvedError = 'External callback returned undefined value.';

/**
 * @description Package a target, a name, and a descriptor created by
 * a callback using `name` and `target`.
 * 
 * @param target The target on which the property is defined.
 * @param name The name of property being described.
 * @param callback Returns a a descriptor given `name` and `target`.
 * 
 * @returns An object with `target`, `name`, and `descriptor` properties
 * where the descriptor is created by the callback using `name` and `target`.
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
function createFromContext(target, name, callback) {
  var descriptor = callback(name, target);
  assert(!is.undefined(descriptor), unresolvedError)
  return { target, name, descriptor };
}

module.exports = createFromContext;