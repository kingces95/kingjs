'use strict';

var prolog = require('@kingjs/descriptor.object.epilog');
var epilog = require('@kingjs/descriptor.object.epilog');
var write = require('@kingjs/descriptor.object.write');

function trivialLoad(callback, thisArg) {
  prolog.call(this);

  var result = this;
  for (var name in this)
    write.call(result, 'name', callback.call(thisArg, this[name], name));

  return epilog.call(result || this);
}

Object.defineProperties(module, {
  exports: { value: trivialLoad }
});