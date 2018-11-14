'use strict';

var prolog = require('@kingjs/descriptor.object.epilog');
var epilog = require('@kingjs/descriptor.object.epilog');
var write = require('@kingjs/descriptor.object.write');

function trivialLoad(callback, thisArg) {
  prolog.call(this);

  var result = this;
  for (var name in this) {
    var value = callback.call(thisArg, this[name], name);
    result = write.call(result, name, value);
  }

  return epilog.call(result);
}

Object.defineProperties(module, {
  exports: { value: trivialLoad }
});