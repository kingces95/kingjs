var apply = require('@kingjs/apply');
var flatten = require('@kingjs/array.nested.to-array');

var takeLeft = require('@kingjs/func.return-arg-0');
var merge = require('@kingjs/descriptor.merge');
var nestedMerge = require('@kingjs/descriptor.nested.merge');
var update = require('@kingjs/descriptor.path');

var inherit = require('@kingjs/poset.inherit');
var decode = require('@kingjs/poset.decode');
var mapNames = require('@kingjs/descriptor.map-names');

var metadata = {
  $refs: undefined,
  $defaults: undefined
}

function decodeAndInherit() {
  var vertexProperties = { };
  return apply.call(this,
    decode, [vertexProperties],
    inherit, [vertexProperties]
  );
}

function resolve(value) {
  if (typeof value != 'string')
    return value;

  return this[value];
}

function normalizeAction() {
  var action = this;

  // normalize action
  if (action === undefined)
    action = { };
    
  else if (action instanceof Function)
    action = { callback: action };

  // assign default callback
  if (action.callback === undefined)
    action.callback = returnThis;

  return action;
}

var emptyObject = { };
function returnThis() {
  return this;
}

function selectDependents(bases, action, result) {

  var depends = action.depends || emptyObject;
  for (var name in depends) {
    var selector = depends[name] || returnThis;

  }

  families[name] = descriptor;
}

var familyActionMap = {
  $defaults: 'defaults',
  $bases: 'bases',
  $wrap: 'wrap',
  $thunks: 'thunks',
};

function composeLeft(g, f) {
  return function(x) { return f(g(x)); }
}

function mergeLeft(left, right) {
  return merge(right, left, true);
}

var resolveAction = {
  callback: null,
  wrap: takeLeft,
  depends: mergeLeft,
  defaults: mergeLeft,
  bases: mergeLeft,
  thunks: composeLeft,
}

function reduction(promises, family) {

  var action = nestedMerge(
    mapNames(family, familyActionMap),
    promises.action,
    resolveAction,
  );

  for (var name in family) {
    if (name.startsWith('$'))
      continue;

    var descriptor = family[name];
    var bases = name.split('$');
    name = bases.shift();
    var dependents = selectDependents.call(
      descriptor,
      bases,
      action
    )
  }

  return this;
}

function transform(action) {
  action = normalizeAction.call(action);

  var promises = [];
  promises.action = action;

  return apply.call(this,
    flatten, null,
    Array.prototype.reduce, [reduction, promises]
    //orderByDependent, [],
    //updatePath, [action.refs, resolve]
  );
}

Object.defineProperties(module, {
  exports: { value: transform }
});