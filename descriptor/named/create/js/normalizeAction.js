'use strict';

var takeLeft = require('@kingjs/func.return-arg-0');
var is = require('@kingjs/is');

var nested = {
  merge: require('@kingjs/descriptor.nested.merge'),
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

  return action;
}

Object.defineProperties(module, {
  exports: { value: normalizeAction }
});