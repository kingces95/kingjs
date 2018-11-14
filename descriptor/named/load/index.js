'use strict';

var trivialLoad = require('./js/trivialLoad');
var simpleLoad = require('./js/simpleLoad');
var posetLoad = require('./js/posetLoad');

function load(callback, refs, thisArg) {

  // vacuous load
  if (!refs && !callback)
    return this;

  // trivial load
  if (!refs)
    return trivialLoad.call(this, callback, thisArg);

  // simple load
  if (!callback)
    return simpleLoad.call(this, refs, thisArg);

  // poset load
  return posetLoad.call(this, callback, refs, thisArg);
}

Object.defineProperties(module, {
  exports: { value: load }
});