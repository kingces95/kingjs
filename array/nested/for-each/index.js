var is = require('@kingjs/is');

function forEach(target, callback, argThis) {

  if (is.arrayLike(target)) {
    for (var i = 0; i < target.length; i++)
      forEach.call(argThis, target[i], callback);    
    return;
  }
  
  callback.call(argThis, target);
}

Object.defineProperties(module, {
  exports: { value: forEach }
});