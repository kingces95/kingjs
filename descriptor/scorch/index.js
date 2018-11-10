'use strict';

var remove = require('@kingjs/descriptor.remove');
var isFrozen = require('@kingjs/descriptor.is-frozen');

function scorchArray() {
  var source = this;
  var target = this;

  var count = 0;
  for (var i = 0; i < source.length; i++) {
    if (source[i] === undefined) {
      if (isFrozen.call(target))
        target = source.slice(0, i);
      count++;
      continue;
    }
    
    if (count > 0)
      target[i - count] = source[i];
  }

  if (source == target) {
    while (count-- > 0)
      target.pop();
  }

  return target;
}

function scorch() {
  if (this instanceof Array)
    return scorchArray.call(this);

  var updatedThis = this;

  for (var name in this) {
    if (this[name] !== undefined)
      continue;
      
    updatedThis = remove.call(updatedThis, name);
  }

  return updatedThis;
}

Object.defineProperties(module, {
  exports: { value: scorch }
});