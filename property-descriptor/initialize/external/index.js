//'use strict';
var assert = require('assert');

var {
  '@kingjs/is': is,
} = require('@kingjs/require-packages').call(module);

var unresolvedStubError = 'Stub returned undefined value.';

function initializeExternal(name, target) {

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

module.exports = initializeExternal;