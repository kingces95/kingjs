'use strict';

var prolog = require('@kingjs/descriptor.object.prolog');
var epilog = require('@kingjs/descriptor.object.epilog');
var update = require('@kingjs/descriptor.nested.update');
var is = require('@kingjs/is');

function resolve(refs) {

  var descriptors = prolog.call(this);

  for (var name in descriptors) {

    descriptors[name] = update(
      descriptors[name],
      refs,
      resolveAndSelect,
      descriptors
    )
  }

  return epilog.call(descriptors);
}

function resolveAndSelect(name, _, selector) {
  if (!is.string(name))
    return name;

  var result = this[name];

  if (selector)
    result = selector(result);

  return result;
}

Object.defineProperties(module, {
  exports: { value: resolve }
});