'use strict';

var is = require('@kingjs/is');
var prolog = require('@kingjs/descriptor.object.prolog');
var epilog = require('@kingjs/descriptor.object.epilog');

function normalize(value, nameOrSelector) {
  prolog.call(value);

  if (is.object(value))
    return epilog.call(value);

  // declarative
  if (typeof nameOrSelector == 'string') {
    var name = nameOrSelector;

    var result = { };
    result[name] = value;
    return epilog.call(result);
  }

  // procedural
  if (nameOrSelector instanceof Function) {
    var result = nameOrSelector(value);
    return epilog.call(result);
  }

  throw 'Failed to normalize value ' + value;
}

Object.defineProperties(module, {
  exports: { value: normalize }
});