'use strict';

var $version = Symbol.keyFor('@kingjs/descriptor.version');

if ($version in global == false)
  global[$version] = 0;

function snapshot() {
  return global[$version]++;
}

Object.defineProperties(module, {
  exports: { value: snapshot }
});