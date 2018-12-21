//'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

var unresolvedStubError = 'Stub returned undefined value.';

function initExternal(target, name) {
  var isWritable = this.writable || false;
  var isExternal = this.external || false;
  var isExtension = this.extends || false;
  var isStatic = this.static || false;
  var isFunction = this.function || false;
  var isGet = 'get' in this;
  var external = this.external;
  var wrap = isFunction ? 'value' : (isGet ? 'get' : 'set');

  assert(!isExtension);
  assert(isExternal);

  // derive descriptor from prototype and name
  var result = external(isStatic ? target : target.constructor, name);
  assert(!is.undefined(result), unresolvedStubError)

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