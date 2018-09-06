var apply = require('@kingjs/apply');

var flatten = require('@kingjs/array.nested.to-array');

var takeLeft = require('@kingjs/func.return-arg-0');

var normalize = require('@kingjs/descriptor.normalize');
var merge = require('@kingjs/descriptor.merge');
var nestedMerge = require('@kingjs/descriptor.nested.merge');
var map = require('@kingjs/descriptor.map');
var mapNames = require('@kingjs/descriptor.map-names');
var inherit = require('@kingjs/descriptor.inherit');

var posetInherit = require('@kingjs/poset.inherit');
var decode = require('@kingjs/poset.decode');

function decodeAndInherit() {
  var vertices = { };

  var encodedPoset = this;
  var edges = decode.call(encodedPoset, vertices);
  result = posetInherit.call(edges, vertices);
  return result;
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

  if (action.bases)
    action.bases = decodeAndInherit.call(action.bases);

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

function wrapInheritMergeInflate(actions, encodedFamily) {

  var action = actions.$;
  var names = Object.keys(encodedFamily);
  var familyAction = mapNames(encodedFamily, familyActionMap);
  if (familyAction) {
    action = nestedMerge(
      normalizeAction.call(familyAction),
      action,
      resolveAction,
    );

    names = names.filter((key) => key[0] != '$');
  }

  var family = names.reduce((family, encodedName) => {

    var baseNames;
    var name = encodedName;
    if (encodedName.indexOf('$') != -1) {
      baseNames = encodedName.split('$');
      name = baseNames.shift();
    }

    var oldDescriptor = encodedFamily[encodedName];
    var newDescriptor = oldDescriptor;

    if (action.wrap)
      newDescriptor = normalize(newDescriptor, action.wrap);

    if (baseNames) {
      var bases = baseNames.map(baseName => action.bases[baseName]);

      newDescriptor = inherit.call(
        newDescriptor, 
        bases, 
        oldDescriptor == newDescriptor
      );
    }

    if (action.defaults) {
      newDescriptor = merge.call(
        newDescriptor, 
        action.defaults,
        takeLeft,
        oldDescriptor == newDescriptor
      );
    }

    newDescriptor = inflate.call(
      newDescriptor, 
      name, 
      oldDescriptor == newDescriptor
    );
    
    family[name] = newDescriptor;
    actions[name] = action;

    return family;
  }, { });

  return family;
}

function transform(action) {

  var actions = { 
    $: normalizeAction.call(action)
  };

  result = flatten.call(this).reduce(
    (aggregate, family) => merge.call(
      aggregate, wrapInheritMergeInflate(actions, family)
    ), { }
  );

  return result;
}

Object.defineProperties(module, {
  exports: { value: transform }
});