var transformDescriptor = require('../../transform')
var apply = require('@kingjs/apply');
var flatten = require('@kingjs/array.nested.to-array');
var pluck = require('@kingjs/descriptor.pluck');
var copy = require('@kingjs/mutate.copy');
var updatePath = require('@kingjs/mutate.path');
var aggregate = require('@kingjs/linq.aggregate');
var selectMany = require('@kingjs/linq.select-many');

var makeEnumerable = require('@kingjs/array.make-enumerable');
var inherit = require('@kingjs/poset.inherit');
var decode = require('@kingjs/poset.decode');
var immutableCopy = require('@kingjs/immutable.copy');
var mapNames = require('@kingjs/immutable.map-names');

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

function compose(f, g) {
  return function(x) { return f(g(x)); }
}

var familyActionUpdate = {
  wrap: null,
  defaults: null,
  bases: null,
  thunks: function(x, y) {
    return copy(x, y, compose);
  },
}

function reduction(promises, family) {

  var familyAction = immutableCopy.call(
    promises.action,
    mapNames(family, familyActionMap),
    familyActionUpdate,
  );

  for (var name in family) {
    if (name.startsWith('$'))
      continue;

    var descriptor = family[name];
    var bases = name.split('$');
    name = bases.shift();
    results[name] = selectDependents.call(
      descriptor,
      bases,
      familyAction
    )
  }

  return this;
}

function transform(action) {
  action = normalizeAction(action);

  var promises = [];
  promises.action = action;

  return apply.call(this,
    flatten, null,
    Array.prototype.reduce, [reduction, promises],
    orderByDependent, [],
    updatePath, [action.refs, resolve]
  );
}

Object.defineProperties(module, {
  exports: { value: transform }
});