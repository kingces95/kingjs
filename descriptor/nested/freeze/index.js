'use strict';

var isObject = require('@kingjs/is-object');

function forEach(value, callback) {
  if (!callback.call(this, value))
    return;

  for (var name in value)
    forEach.call(this, value[name], callback);
}

function freeze(value) {
  if (!isObject(value))
    return false;

  if (!value.$freeze)
    return false;

  delete value.$freeze;
  Object.freeze(value);
  return true;
}

Object.defineProperties(module, {
  exports: { 
    value: function(value) { 
      forEach.call(this, value, freeze); 
    } 
  }
});