'use strict';

var wildcardName = '*';
var hide = { enumerable: false };

function mergeWildcards(tree, value) {
  if (wildcardName in tree == false)
    return tree;

  var wildcard = tree[wildcardName];

  tree = Object.create(tree);
  Object.defineProperty(tree, wildcardName, hide);

  for (var name in value) {
    if (name in tree == true)
      continue;
    tree[name] = wildcard;
  }

  return tree;
}

Object.defineProperties(module, {
  exports: { value: mergeWildcards }
});