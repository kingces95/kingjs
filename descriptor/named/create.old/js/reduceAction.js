'use strict';

var takeLeft = require('@kingjs/func.return-arg-0');
var is = require('@kingjs/is');

var nested = {
  merge: require('@kingjs/descriptor.nested.merge'),
}

var nestedArray = {
  reduce: require('@kingjs/descriptor.nested.array.reduce')
}

function concat(left, right) {
  return left.concat(right);
}

var actionMergePaths = {
  wrap: takeLeft,
  bases: concat,
  basePoset: { '*': takeLeft },
  defaults: { '*': takeLeft },
  inflate: { '*': takeLeft },
  thunks: { '*': composeLeft },
  scorch: { '*': takeLeft },
  depends: { '*': takeLeft },
  callback: null,
  refs: { '*': takeLeft },
  freeze: takeLeft,

  $encodedName: takeLeft,
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
    return nestedArray.reduce(action, 
      (reduction, o) => { 
        o = normalizeAction(o);
        if (reduction)
          o = nested.merge(reduction, o, actionMergePaths)
        return o;
      }
    );
  }

  return action;
}

Object.defineProperties(module, {
  exports: { value: normalizeAction }
});