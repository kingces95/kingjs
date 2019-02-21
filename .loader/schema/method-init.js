//'use strict';

var objectEx = require('@kingjs/object-ex')

function init() {
  if (this.isExtension)
    initExtension.call(this);
}

function initExtension() {
  var Extendable = this.loader.load('Extendable');
  if (!Extendable)
    Extendable = Object;

  var target = Extendable.prototype;

  objectEx.defineFunction(target, this.id, {
    extends: () => this.extends.load(),
    value: this.load()
  })
}

Object.defineProperties(module, {
  exports: { value: init }
});