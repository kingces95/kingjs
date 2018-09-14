'use strict';

var write = require('@kingjs/descriptor.write');
var isObject = require('@kingjs/is-object');
var mergeWildcards = require('@kingjs/descriptor.merge-wildcards');

var copyOnWriteArgPosition = 3;

var updateNode = write.define(
  function(
    target,
    context,
    paths,
    callback,
    copyOnWrite) {
  
    for (var name in paths) {
  
      var result = update.call(
        context,
        this[name],
        paths[name],
        callback,
        copyOnWrite
      );
  
      target = write.call(
        this, target, name, result
      );
    }
  
    return target;
  }, copyOnWriteArgPosition
);

function update(tree, paths, callback, copyOnWrite) {

  if (!isObject(paths))
    return callback.call(this, tree, paths);

  if (!isObject(tree))
    return tree;

  paths = mergeWildcards.call(paths, tree, true);

  return updateNode.call(
    tree,
    this,
    paths,
    callback,
    copyOnWrite
  );
}

Object.defineProperties(module, {
  exports: { 
    value: function(tree, paths, callback, copyOnWrite) {
      if (paths === undefined || tree === undefined)
        return tree;

      return update.call(this, tree, paths, callback, copyOnWrite);
    }
  }
});