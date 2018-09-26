'use strict';

var create = require('@kingjs/descriptor.create');
var assert = require('@kingjs/assert');

var $version = Symbol.for('@kingjs/descriptor.write::version');

function write(key, value, version) {
  var hasVersion = version !== undefined;

  assert(!hasVersion || typeof version == 'symbol');
  assert(!hasVersion || Symbol.keyFor(version) === undefined);

  if (value === this[key] && (value !== undefined || key in this))
    return this;

  var updatedThis = this;

  if ((hasVersion && updatedThis[$version] !== version) || Object.isFrozen(updatedThis)) {
    updatedThis = create(updatedThis);

    if (hasVersion)
      updatedThis[$version] = version;
  }

  updatedThis[key] = value;
  return updatedThis;
}

Object.defineProperties(module, {
  exports: { value: write }
});