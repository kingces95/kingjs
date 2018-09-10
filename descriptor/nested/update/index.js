'use strict';

var updateDescriptor = require('@kingjs/descriptor.update');
var isObject = require('@kingjs/is-object');
var mergeWildcards = require('../../merge-wildcards');

var updateNode = updateDescriptor.define(
  function(
    target,
    tree,
    copyOnWrite) {
  
    for (var name in tree) {
  
      var result = update(
        this[name],
        tree[name],
        copyOnWrite
      );
  
      target = updateDescriptor.call(
        this, target, name, result
      );
    }
  
    return target;
  }, 1
);

function update(value, tree, copyOnWrite) {

  if (tree instanceof Function)
    return tree(value, copyOnWrite);

  if (!isObject(tree))
    return value;

  if (!isObject(value))
    return value;

  tree = mergeWildcards.call(tree, value, true);

  return updateNode.call(
    value,
    tree, 
    copyOnWrite
  );
}

Object.defineProperties(module, {
  exports: { 
    value: function(value, tree, copyOnWrite) {
      return update(value, tree, null, copyOnWrite);
    }
  }
});