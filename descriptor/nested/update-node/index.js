'use strict';

var update = require('@kingjs/descriptor.update');

var wildcard = '*';

function get(node, name) {
  if (!node)
    return undefined;
  
  if (name in node)
    return node[name];

  return node[wildcard];
}

function updateNode(
  target,
  callback,
  context,
  first,
  second,
  copyOnWrite) {
  
  for (var name in this) {

    target = update.call(
      this, target, name, 
      callback(
        this[name],
        context,
        get(first, name),
        get(second, name),
        copyOnWrite
      )
    );
  }

  return target;
}

Object.defineProperties(module, {
  exports: { value: update.define(updateNode, 4) }
});