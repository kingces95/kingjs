'use strict';

var prolog = require('@kingjs/descriptor.object.prolog');
var epilog = require('@kingjs/descriptor.object.epilog');
var removeHelper = require('@kingjs/descriptor.object.remove');

function remove(key, value) {
  prolog.call(this);
  var result = removeHelper.call(this, key, value);
  return epilog.call(result);
}

Object.defineProperties(module, {
  exports: { value: remove }
});