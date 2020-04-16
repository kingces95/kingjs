'use strict';

var update = require('@kingjs/descriptor.nested.update');

function forEach(tree, paths, callback, thisArg) {
  return update(tree, paths, function(value, name, path) { 
    callback.call(this, value, name, path); 
    return value; 
  }, thisArg);
}

Object.defineProperties(module, {
  exports: { value: forEach }
});