'use strict';

var epilog = require('@kingjs/descriptor.object.epilog');
var clone = require('@kingjs/descriptor.object.clone');

function trivialLoad(callback, thisArg) {

  var result;
  for (var name in this) {

    var descriptor = callback.call(thisArg, this[name], name);
    if (descriptor == this[name])
      continue;

    if (!result)
      result = clone.call(this);

    result[name] = descriptor;
  }

  return epilog.call(result || this);
}

Object.defineProperties(module, {
  exports: { value: trivialLoad }
});