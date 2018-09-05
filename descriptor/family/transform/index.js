var apply = require('@kingjs/apply');

var flatten = require('@kingjs/array.nested.to-array');

var takeLeft = require('@kingjs/func.return-arg-0');

var normalize = require('@kingjs/descriptor.normalize');
var merge = require('@kingjs/descriptor.merge');
var nestedMerge = require('@kingjs/descriptor.nested.merge');
var map = require('@kingjs/descriptor.map');
var mapNames = require('@kingjs/descriptor.map-names');

var inherit = require('@kingjs/poset.inherit');
var decode = require('@kingjs/poset.decode');

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

var emptyObject = { };
function returnThis() {
  return this;
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

function inflate(name, copyOnWrite) {
  return map.call(this, function(value, key) {

    if (value instanceof Function == false)
      return value;
    
    if (value.name != '$')
      return value;

    return value(name, key);    
  }, copyOnWrite)
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

var resolveAction = {
  callback: null,
  wrap: takeLeft,
  depends: takeLeft,
  defaults: takeLeft,
  bases: takeLeft,
  thunks: composeLeft,
}

function transform(action) {
  action = normalizeAction.call(action);

  var result = flatten.call(this);

  result = result.map(function(encodedFamily) {
    var familyAction = nestedMerge(
      mapNames(encodedFamily, familyActionMap),
      action,
      resolveAction,
    );

    var keys = Object.keys(encodedFamily);
    var names = keys.filter(function(key) {
      return key[0] != '$';
    });

    var descriptors = names.reduce(function(family, name) {

      var bases;

      if (name.indexOf('$') != -1) {
        bases = name.split('$');
        name = bases.shift();
      }

      var oldDescriptor = encodedFamily[name];
      var newDescriptor = oldDescriptor;

      if (familyAction.wrap)
        newDescriptor = normalize(newDescriptor, familyAction.wrap);

      if (bases)
        newDescriptor = inherit.call(newDescriptor, bases, oldDescriptor == newDescriptor);

      if (familyAction.defaults)
        newDescriptor = merge.call(newDescriptor, familyAction.defaults, oldDescriptor == newDescriptor);

      newDescriptor = inflate.call(newDescriptor, name, oldDescriptor == newDescriptor);
      
      family[name] = newDescriptor;

      return family;
    }, { });

    return descriptors;
  });

  if (result.length == 1) {
    result = result[0];
  }
  else {
    result = result.reduce(function(aggregate, value) {
      return merge.call(aggregate, value);
    }, { });
  }

  return result;
}

Object.defineProperties(module, {
  exports: { value: transform }
});