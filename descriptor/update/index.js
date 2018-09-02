'use strict';

var create = require('@kingjs/descriptor.create');

function update(target, key, delta) {
  if (delta === undefined)
    return;
    
  var value = this[key];
  if (value === delta)
    return target;

  if (!target)
    target = create(this);

  target[key] = delta;
  return target;
}

update.prolog = function(copyOnWrite) {
  if (copyOnWrite)
    return null;

  if (Object.isFrozen(this))
    return null;

  return this;
}

update.epilog = function(target) {
  if (target == null)
    return this;

  if (Object.isFrozen(this))
    Object.freeze(target);

  return target;
}

update.define = function(func, copyOnWriteArg) {
  return function() {
    var copyOnWrite = arguments[copyOnWriteArg];
    var target = update.prolog.call(this, copyOnWrite);
    var result = func.call(this,
      target,
      arguments[0],
      arguments[1],
      arguments[2],
      arguments[3],
      arguments[4]
    );
    return update.epilog.call(this, result);
  }
}

Object.defineProperties(module, {
  exports: { value: update }
});