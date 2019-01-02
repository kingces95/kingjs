
'use strict';

var assert = require('@kingjs/assert');
var objectEx = require('@kingjs/object-ex');

var packageNameRx = /^(?:[@]([a-z\d]+)[/])?([a-z\d-]+)$/;
var scopeCaptureGroup = 1;
var nameCaptureGroup = 2;

var atSymbol = '@';
var forwardSlash = '/';

function FullName(name, scope) {
  assert(name);

  this.name = name;
  this.scope = scope || null;
}

objectEx.defineFunctions(FullName.prototype, {
  equals: function(other) {
    if (other instanceof FullName == false)
      return false;

    if (this.scope !== other.scope)
      return false;

    return this.name === other.name;
  }
})

objectEx.defineLazyFunctions(FullName.prototype, {
  toString: function() {
    var result = this.name;
    if (this.scope)
      result = atSymbol + this.scope + forwardSlash + result;
    return result;
  }
})

objectEx.defineFunctions(FullName, {
  parse: function(name) {
    var result = name.match(packageNameRx);
    if (!result)
      return;
  
    var scope = result[scopeCaptureGroup];
    var name = result[nameCaptureGroup];
    if (!name)
      return;
  
    return new FullName(
      name,
      scope
    )
  }
})

Object.defineProperties(module, {
  exports: { value: FullName }
});