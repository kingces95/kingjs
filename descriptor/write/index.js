'use strict';

var prolog = require('@kingjs/descriptor.object.prolog');
var epilog = require('@kingjs/descriptor.object.epilog');
var writeHelper = require('@kingjs/descriptor.object.write');

function write(key, value) {
  prolog.call(this);
  var result = writeHelper.call(this, key, value);
  return epilog.call(result);
}

Object.defineProperties(module, {
  exports: { value: write }
});