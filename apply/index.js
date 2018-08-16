'use strict';

var emptyArray = [];

function apply(target) {
  if (arguments.length < 2)
    return target;

  if (arguments.length % 2 == 0)
    Array.prototype.push.call(arguments, emptyArray);

  for (var i = 1; i < arguments.length; ) 
    target = arguments[i++].apply(target, arguments[i++]);
    
  return target;
}

Object.defineProperties(module, {
  exports: { value: apply }
});