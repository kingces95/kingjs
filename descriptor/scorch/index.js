'use strict';

var prolog = require('@kingjs/descriptor.object.prolog');
var epilog = require('@kingjs/descriptor.object.epilog');
var remove = require('@kingjs/descriptor.object.remove');

function scorchArray() {
  var source = this;
  var target = this;
  var sliced = false;

  var count = 0;
  for (var i = 0; i < source.length; i++) {
    if (source[i] === undefined) {
      if (!sliced) {
        target = source.slice(0, i);
        sliced = true;
      }
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
  prolog.call(this);

  if (this instanceof Array)
    return scorchArray.call(this);

  var updatedThis = this;

  for (var name in this) {
    if (this[name] !== undefined)
      continue;
      
    updatedThis = remove.call(updatedThis, name);
  }

  return epilog.call(updatedThis);
}

Object.defineProperties(module, {
  exports: { value: scorch }
});