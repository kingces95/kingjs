var apply = require('@kingjs/apply');

var flatten = require('@kingjs/array.nested.to-array');

var takeLeft = require('@kingjs/func.return-arg-0');

var normalize = require('@kingjs/descriptor.normalize');
var merge = require('@kingjs/descriptor.merge');
var nestedMerge = require('@kingjs/descriptor.nested.merge');
var map = require('@kingjs/descriptor.map');
var mapNames = require('@kingjs/descriptor.map-names');
var inherit = require('@kingjs/descriptor.inherit');

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

function replace(name, thunks, copyOnWrite) {
  return map.call(this, function(value, key) {
    var thunk = thunks[key];
    if (!thunk)
      return value;

    return thunk.call(value, name, key);
  }, copyOnWrite);
}

function selectDependents(bases, action, result) {

  var depends = action.depends || emptyObject;
  for (var name in depends) {
    var selector = depends[name] || returnThis;

  }

  families[name] = descriptor;
}

function mergeAll() {}

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
    var familyAction = mapNames(encodedFamily, familyActionMap);

    familyAction = !familyAction ? action : nestedMerge(
      familyAction,
      action,
      resolveAction,
    );

    var keys = Object.keys(encodedFamily);
    var names = keys.filter(function(key) {
      return key[0] != '$';
    });

    var descriptors = names.reduce(function(family, encodedName) {

      var baseNames;

      var name = encodedName;
      if (encodedName.indexOf('$') != -1) {
        baseNames = encodedName.split('$');
        name = baseNames.shift();
      }

      var oldDescriptor = encodedFamily[encodedName];
      var newDescriptor = oldDescriptor;

      if (familyAction.wrap)
        newDescriptor = normalize(newDescriptor, familyAction.wrap);

      if (baseNames) {
        var bases = baseNames.map(baseName => familyAction.bases[baseName]);
        newDescriptor = inherit.call(newDescriptor, bases, oldDescriptor == newDescriptor);
      }

      if (familyAction.defaults)
        newDescriptor = merge.call(newDescriptor, familyAction.defaults, oldDescriptor == newDescriptor);

      newDescriptor = inflate.call(newDescriptor, name, oldDescriptor == newDescriptor);
      
      family[name] = newDescriptor;

      return family;
    }, { });

    return descriptors;
  });

  result = result.reduce(function(aggregate, value) {
    return merge.call(aggregate, value);
  }, { });

  return result;
}

Object.defineProperties(module, {
  exports: { value: transform }
});