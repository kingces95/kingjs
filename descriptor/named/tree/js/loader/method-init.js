//'use strict';

var assert = require('@kingjs/assert');

function init() {
  if (this.isExtension)
    this.loader.unloadedExtensionMethods.push(this);
}

Object.defineProperties(module, {
  exports: { value: init }
});