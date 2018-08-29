'use strict';

function forEach(target, path, func) {

  if (!path || path.length == 0)
    return this;

  if (typeof path == 'string')
    path = path.split('.');

  var self = this;

  function recurse(index, name) {
    if (!this)
      return;
    
    if (name == '*') {
      for (var property in this) 
        recurse.call(this, index, property);
      return;
    }
    
    if (index++ < path.length - 1) {
      recurse.call(this[name], index, path[index]);
      return;
    }
    
    if (name in this == false)
      return;

      this[name] = func.call(self, this[name]);
  }

  recurse.call(this, 0, path[0]);

  return this;
}

Object.defineProperties(module, {
  exports: { value: forEach }
});