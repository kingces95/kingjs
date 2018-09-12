'use strict';

var updateDescriptor = require('@kingjs/descriptor.update');
var isObject = require('@kingjs/is-object');
var mergeWildcards = require('@kingjs/descriptor.merge-wildcards');

var copyOnWriteArgPosition = 1;

var updateNode = updateDescriptor.define(
  function(
    target,
    paths,
    copyOnWrite) {
  
    for (var name in paths) {
  
      var result = update(
        this[name],
        paths[name],
        copyOnWrite
      );
  
      target = updateDescriptor.call(
        this, target, name, result
      );
    }
  
    return target;
  }, copyOnWriteArgPosition
);

function update(tree, paths, copyOnWrite) {

  if (paths instanceof Function)
    return paths(tree, copyOnWrite);

  if (!isObject(paths))
    return tree;

  if (!isObject(tree))
    return tree;

  paths = mergeWildcards.call(paths, tree, true);

  return updateNode.call(
    tree,
    paths, 
    copyOnWrite
  );
}

Object.defineProperties(module, {
  exports: { 
    value: function(tree, paths, copyOnWrite) {
      return update(tree, paths, null, copyOnWrite);
    }
  }
});