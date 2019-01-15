//'use strict';
var assert = require('assert');

var {
  ['@kingjs']: { is }
} = require('./dependencies');

var unresolvedStubError = 'Stub returned undefined value.';

/**
 * @this any The descriptor that delegates its initialize the callback `external`.
 * @param name First callback arg. Generally the name of the property.
 * @param target Second callback arg. Generally the target, a function or prototype.
 * @returns The descriptor whose properties have been overwritten with those of the callback result.
 */
function external(name, target) {

  // derive descriptor from constructor and name
  var result = this.external(name, target);
  assert(!is.undefined(result), unresolvedStubError)

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