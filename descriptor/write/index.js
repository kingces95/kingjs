'use strict';

var create = require('@kingjs/descriptor.create');
var isEnumerable = require('@kingjs/is-enumerable');

var makeEnumerable = { 
  enumerable: true,
  writable: true,
  configurable: true
};

var makeNotEnumerable = { 
  enumerable: false,
  writable: true,
  configurable: true
};

function write(target, key, delta) {

  var value = this[key];

  if (value === delta) {

    var keyInThis = value !== undefined || key in this;
    var keyIsEnumerable = isEnumerable.call(target || this, key);

    if (keyInThis && keyIsEnumerable)
      return target;
  }

  if (!target)
    target = create(this);

  if (!isEnumerable.call(target, key))
    Object.defineProperty(target, key, makeEnumerable);

  target[key] = delta;
  return target;
}

write.clear = function(target, key) {
  if (!isEnumerable.call(target || this, key))
    return target;

  if (!target)
    target = create(this);

  Object.defineProperty(target, key, makeNotEnumerable);

  return target;
}

write.prolog = function(copyOnWrite) {
  if (copyOnWrite)
    return null;

  if (Object.isFrozen(this))
    return null;

  return this;
}

write.epilog = function(target) {
  if (target == null)
    return this;

  if (Object.isFrozen(this))
    Object.freeze(target);

  return target;
}

write.define = function(func, copyOnWriteArg) {
  return function() {
    var copyOnWrite = arguments[copyOnWriteArg];
    var target = write.prolog.call(this, copyOnWrite);
    var result = func.call(this,
      target,
      arguments[0],
      arguments[1],
      arguments[2],
      arguments[3],
      arguments[4],
      arguments[5]
    );
    return write.epilog.call(this, result);
  }
}

Object.defineProperties(module, {
  exports: { value: write }
});