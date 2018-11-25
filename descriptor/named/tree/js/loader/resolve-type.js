'use strict';

var assert = require('@kingjs/assert');
var is = require('@kingjs/is')
var Node = require('../node');

var Loader;

function resolveFunction(func) {
  assert(is.function(func));

  if (!Loader)
    Loader = require('./schema').Loader;

  switch(ref) {
    case Object: return Loader.Object;
    case Boolean: return Loader.Boolean;
    case Number: return Loader.Number;
    case Symbol: return Loader.Symbol;
    case Array: return Loader.Array;
    case String: return Loader.String;
  }

  return undefined;
}

function resolveType(ref) {
  if (is.function(ref))
    return resolveFunction(ref);

  return Node.prototype.resolve.call(this, ref);
}

Object.defineProperties(module, {
  exports: { value: resolveType }
});