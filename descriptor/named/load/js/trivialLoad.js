'use strict';

var epilog = require('@kingjs/descriptor.object.epilog');
var Dictionary = require('@kingjs/Dictionary');

function trivialLoad(callback, thisArg) {

  var result;
  for (var name in this) {
    if (!result)
      result = new Dictionary();
    result[name] = callback.call(thisArg, this[name]);
  }

  return epilog.call(result || this);
}

Object.defineProperties(module, {
  exports: { value: trivialLoad }
});