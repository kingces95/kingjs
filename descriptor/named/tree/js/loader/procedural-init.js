//'use strict';

var assert = require('@kingjs/assert');
var objectEx = require('@kingjs/object-ex')

function init() {
  var self = this;

  objectEx.defineProperty(
    this.loader.prototype,
    this.id, {
      external: true,
      func: function() {
        return self.func;
      }
    }
  );
}

Object.defineProperties(module, {
  exports: { value: init }
});