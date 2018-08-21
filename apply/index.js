'use strict';

var emptyArray = [];

function apply() {

  var target = this;

  for (var i = 0; i < arguments.length; ) {
    var func = arguments[i++];
    var args = arguments[i++];
    target = func.apply(target, args);
  }
    
  return target;
}

Object.defineProperties(module, {
  exports: { value: apply }
});