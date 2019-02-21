'use strict';

var write = require('@kingjs/descriptor.object.write');
var is = require('@kingjs/is');
var prolog = require('@kingjs/descriptor.object.prolog');
var epilog = require('@kingjs/descriptor.object.epilog');

var star = '*';

function updateNode(
  paths,
  callback,
  thisArg,
  stack) {

  var updatedThis = prolog.call(this);
  
  var subPaths;
  for (var name in this) {

    if (name in paths)
      subPaths = paths[name];
    else if (star in paths)
      subPaths = paths[star];
    else
      continue;

    var delta = update(
      this[name],
      subPaths,
      callback,
      thisArg,
      name,
      stack
    );

    updatedThis = write.call(
      updatedThis, name, delta
    );
  }

  return epilog.call(updatedThis);
}

function update(
  tree, 
  paths, 
  callback, 
  thisArg, 
  name, 
  stack) {

  if (!is.object(paths))
    return callback.call(thisArg, tree, name, paths, stack);

  if (!is.object(tree))
    return tree;

  if (name && callback.hasStack) {
    if (!stack)
      stack = [ ];
    stack.push(name);
  }

  var result = updateNode.call(
    tree,
    paths,
    callback,
    thisArg,
    stack
  );

  if (callback.onNode)
    result = callback.onNode.call(thisArg, result, name, paths, stack);

  return result;
}

Object.defineProperties(module, {
  exports: { value: update }
});