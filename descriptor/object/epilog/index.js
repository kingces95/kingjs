'use strict';

var freeze = require('@kingjs/descriptor.object.freeze');

function epilog() {
  freeze.call(this);
  return this;
}

Object.defineProperties(module, {
  exports: { value: epilog }
});