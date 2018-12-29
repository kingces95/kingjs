//'use strict';

var assert = require('@kingjs/assert');
var objectEx = require('@kingjs/object-ex')

function init() {
  if (this.isExtension)
    initExtension.call(this);
}

function initExtension() {
  var loader = this.loader;
  var ExtendableType = loader.Extendable;
  var Extendable = ExtendableType.load();
  var target = Extendable.prototype;

  objectEx.defineFunction(target, this.id, {
    extends: () => this.extends.load(),
    value: this.load()
  })
}

Object.defineProperties(module, {
  exports: { value: init }
});