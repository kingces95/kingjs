var assert = require('assert');

var {
  ['@kingjs']: { is }
} = require('./dependencies');

var unresolvedError = 'External callback returned undefined value.';

/**
 * @description Overwrites a descriptors properties with those of the
 * result of a callback invoked with the name and target.
 * 
 * @this any The descriptor that delegates its initialization to `callback`.
 * 
 * @param callback Returns a function or a descriptor given `name` and `target`.
 * @param name The name of property being described.
 * @param target The target on which the property is defined.
 * 
 * @returns The descriptor whose properties have been overwritten with those of the callback result.
 * 
 * @callback
 * @param name The name of property being described.
 * @param target The target on which the property is defined.
 */
function external(callback, name, target) {

  // derive descriptor from constructor and name
  var result = callback(name, target);
  assert(!is.undefined(result), unresolvedError)

  // wrap result if it's a function
  if (is.function(result)) {
    this.value = result;
  }

  // otherwise simply copy all of result's keys
  else {
    for (var key in result)
      this[key] = result[key];
  }
}

module.exports = external;