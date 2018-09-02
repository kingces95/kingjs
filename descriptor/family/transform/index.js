var apply = require('@kingjs/apply');

var flatten = require('@kingjs/array.nested.to-array');

var takeLeft = require('@kingjs/func.return-arg-0');

var normalize = require('@kingjs/descriptor.normalize');
var merge = require('@kingjs/descriptor.merge');
var nestedMerge = require('@kingjs/descriptor.nested.merge');
var mapNames = require('@kingjs/descriptor.map-names');
var inflate = require('./inflate');

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

  var copyOnWrite = true;

  return apply.call(this,
    flatten, null,
    selectMany, family => {
      var familyAction = nestedMerge(
        mapNames(family, familyActionMap),
        action,
        resolveAction,
      );  

      return apply.call(Object.keys(family),
        where, [name => name[0] != '$"'],
        select, [name => { 
          var bases = name.split('$');
          name = bases.shift();

          var descriptor = normalize(family[name], copyOnWrite);
          descriptor = inherit.call(descriptor, bases, copyOnWrite);
          descriptor = merge.call(descriptor, familyAction.defaults, copyOnWrite);
          descriptor = inflate.call(descriptor, name, copyOnWrite);
          return descriptor;
        }],
      );      
    },
    //orderByDependent, [],
    //updatePath, [action.refs, resolve]
  );
}

Object.defineProperties(module, {
  exports: { value: transform }
});