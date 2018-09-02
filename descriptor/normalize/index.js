'use strict';

function normalize(value, nameOrSelector) {

  if (typeof value == 'object' && value != null)
    return value;

  // declarative
  if (typeof nameOrSelector == 'string') {
    var name = nameOrSelector;

    var result = { };
    result[name] = value;
    return result;
  }

  // procedural
  if (nameOrSelector instanceof Function)
    return nameOrSelector(value);

  throw 'Failed to normalize value ' + value;
}

Object.defineProperties(module, {
  exports: { value: normalize }
});