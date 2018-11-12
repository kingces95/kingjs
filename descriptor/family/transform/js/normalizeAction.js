'use strict';

var takeLeft = require('@kingjs/func.return-arg-0');
var is = require('@kingjs/is');

var write = require('@kingjs/descriptor.write');

var poset = {
  decode: require('@kingjs/poset.decode'),
  inherit: require('@kingjs/poset.inherit')
}

var nested = {
  merge: require('@kingjs/descriptor.nested.merge'),
  freeze: require('@kingjs/descriptor.nested.freeze'),
}

var nestedArray = {
  flatten: require('@kingjs/descriptor.nested.array.to-array'),
  update: require('@kingjs/descriptor.nested.array.update'),
  reduce: require('@kingjs/descriptor.nested.array.reduce')
}

var actionMergePaths = {
  callback: null,
  scorch: takeLeft,
  freeze: takeLeft,
  wrap: takeLeft,
  defaults: { '*': takeLeft },
  bases: { '*': takeLeft },
  thunks: { '*': composeLeft },
  depends: { '*': takeLeft },
  refs: { '*': takeLeft },
};

function composeLeft(g, f) {
  return function(x) { return f(g(x)); }
}

function decodeAndInherit(encodedPoset) {
  var vertices = { };
  var edges = poset.decode.call(encodedPoset, vertices);
  return poset.inherit.call(edges, vertices);
}

function normalizeAction(action) {

  if (action === undefined)
    return { };

  if (is.function(action))
    return { callback: action };

  if (is.array(action)) {
    action = nestedArray.flatten(action);
    action = nestedArray.update(action, o => normalizeAction(o));
    action = nestedArray.reduce(action, 
      (x, o) => nested.merge(x, o, actionMergePaths)
    );
  }

  if (action.bases) {
    action = write.call(action, 'bases', 
      decodeAndInherit(action.bases)
    );
  }

  return action;
}

Object.defineProperties(module, {
  exports: { value: normalizeAction }
});