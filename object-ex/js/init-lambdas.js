'use strict';

var is = require('@kingjs/is');

var emitGetter = x => new Function('return ' + x + ';');
var emitSetter = x => new Function('value', x + ';');

var map = {
  value: emitGetter,
  get: emitGetter,
  set: emitSetter
}

function emitLambdas() {

  for (var name in map) {
    var value = this[name];

    if (!is.string(value))
      continue;

    this[name] = map[name](value);
  }

  return this;
}

Object.defineProperties(module, {
  exports: { value: emitLambdas }
});