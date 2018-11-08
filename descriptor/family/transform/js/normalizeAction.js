var takeLeft = require('@kingjs/func.return-arg-0');
var is = require('@kingjs/is');

var nested = {
  merge: require('@kingjs/descriptor.nested.merge'),
  freeze: require('@kingjs/descriptor.nested.freeze'),
}

var nestedArray = {
  flatten: require('@kingjs/descriptor.nested.array.to-array'),
  update: require('@kingjs/descriptor.nested.array.update'),
  reduce: require('@kingjs/descriptor.nested.array.reduce')
}

function normalizeAction(action) {

  if (action === undefined)
    action = { };
    
  else if (is.function(action))
    action = { callback: action };

  else if (is.array(action)) {
    action = nestedArray.flatten(action);
    action = nestedArray.update(action, o => normalizeAction(o));
    action = nestedArray.reduce(action, 
      (x, o) => nested.merge(x, o, actionMergePaths)
    );
  }

  return action;
}

function composeLeft(g, f) {
  return function(x) { return f(g(x)); }
}

var actionMergePaths = nested.freeze({
  callback: null,
  scorch: takeLeft,
  freeze: takeLeft,
  wrap: takeLeft,
  defaults: { '*': takeLeft },
  bases: { '*': takeLeft },
  thunks: { '*': composeLeft },
  depends: { '*': takeLeft },
  refs: { '*': takeLeft },
}, { '*': null });

Object.defineProperties(module, {
  exports: { value: normalizeAction }
});