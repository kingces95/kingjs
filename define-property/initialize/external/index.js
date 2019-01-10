//'use strict';
var assert = require('assert');

var {
  '@kingjs/is': is,
} = require('@kingjs/require-packages').call(module);

var unresolvedStubError = 'Stub returned undefined value.';

function initializeExternal(name, target) {
  var isWritable = this.writable || false;
  var isFunction = this.function || false;
  var isGet = 'get' in this;

  // derive descriptor from constructor and name
  var result = this.external(name, target);
  assert(!is.undefined(result), unresolvedStubError)

  // wrap result if it's a function
  if (is.function(result)) {
    this[isFunction ? 'value' : (isGet ? 'get' : 'set')] = result;
    if (isFunction)
      this.writable = isWritable;
  }

  // otherwise simply copy all of results keys
  else {
    for (var key in result)
      this[key] = result[key];
    assert(isFunction == ('value' in this));
  }
}

module.exports = initializeExternal;