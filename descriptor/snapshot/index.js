'use strict';

var $version = Symbol.for('@kingjs/descriptor.snapshot');

if ($version in global == false)
  global[$version] = 0;

function snapshot() {
  var result = global[$version]++;
  return result;
}

Object.defineProperties(module, {
  exports: { value: snapshot }
});