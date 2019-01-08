//'use strict';
var assert = require('assert');

var is = require('@kingjs/is');

var unresolvedStubError = 'Stub returned undefined value.';

function initExternal(name, target) {
  var isConfigurable = this.configurable || false;
  var isEnumerable = this.enumerable || false;
  var isWritable = this.writable || false;
  var isExternal = this.external || false;
  var isExtension = this.extends || false;
  var isFunction = this.function || false;
  var isGet = 'get' in this;
  var external = this.external;
  var wrap = isFunction ? 'value' : (isGet ? 'get' : 'set');

  assert(!isExtension);
  assert(isExternal);

  // derive descriptor from constructor and name
  var result = external(name, target);
  assert(!is.undefined(result), unresolvedStubError)

  // assign defaults
  this.configurable = isConfigurable;
  this.enumerable = isEnumerable;

  // wrap result if it's a function
  if (is.function(result)) {
    this[wrap] = result;
    if (isFunction)
      this.writable = isWritable;
  }

  // otherwise simply copy all of results keys
  else {
    for (var key in result)
      this[key] = result[key];
    assert(isFunction == ('value' in this));
  }

  return this;
}

Object.defineProperties(module, {
  exports: { value: initExternal }
});