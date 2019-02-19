'use strict';

var assert = require('assert');
var is = require('@kingjs/is');
var freeze = require('@kingjs/descriptor.object.freeze');

function epilog() {
  if (this === null)
    return this;

  assert(is.object(this));
  freeze.call(this);
  return this;
}

Object.defineProperties(module, {
  exports: { value: epilog }
});