'use strict';

var update = require('../update');

function forEach(value, tree, callback) {
  return update(value, tree, function(value) {
    callback(value);
    return value;
  });
}

Object.defineProperties(module, {
  exports: { value: forEach }
});