'use strict';

var update = require('@kingjs/descriptor.nested.update');

function forEach(tree, paths, callback, thisArg) {
  return update(tree, paths, function(o, p) { 
    callback.call(this, o, p); 
    return o; 
  }, thisArg);
}

Object.defineProperties(module, {
  exports: { value: forEach }
});