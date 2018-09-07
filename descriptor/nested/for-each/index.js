'use strict';

var update = require('@kingjs/descriptor.update');

function forEach(value, func, path, copyOnWrite) {

  if (!path)
    path = func;

  // if path => value is leaf, then take action
  if (path instanceof Function) {

    if (!func)
      func = path;

    return func.call(this, value);
  }

  // else if value is node, then recurse
  if (value !== null && typeof value == 'object')
    return forEachNode.call(value, func, path, copyOnWrite);

  return value;
}

function forEachNode(target, func, path, copyOnWrite) {

  var starAction;
  for (var name in path) {

    if (name == '*') {
      starAction = path[name];
      continue;
    }

    target = update.call(
      this, target, name, 
      forEach(target[name], func, path[name], copyOnWrite)
    );
  }

  if (starAction) {
    for (var name in target) {
      if (name in path)
        continue;

      target = update.call(
        this, target, name, 
        forEach(target[name], func, path[name], copyOnWrite)
      );
    }
  }

  return target;
}

// install update stubs
var forEachNode = update.define(forEachNode, 2);

Object.defineProperties(module, {
  exports: { value: forEach }
});