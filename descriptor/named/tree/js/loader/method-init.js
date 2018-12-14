//'use strict';

var assert = require('@kingjs/assert');
var objectEx = require('@kingjs/object-ex')

function init() {
  if (!this.isExtension)
    return;

  objectEx.defineFunction(Object.prototype, this.id, {
    extends: () => this.extends.load(),
    value: this.func
  })
}

Object.defineProperties(module, {
  exports: { value: init }
});