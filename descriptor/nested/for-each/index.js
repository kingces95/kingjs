'use strict';

var update = require('@kingjs/descriptor.nested.update');

function forEach(tree, paths, callback, thisArg) {
  return update(tree, paths, function(value, index) { 
    callback.call(this, value, index); 
    return value; 
  }, thisArg);
}

Object.defineProperties(module, {
  exports: { value: forEach }
});