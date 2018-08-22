var transformDescriptor = require('../../transform')
var apply = require('@kingjs/apply');
var flatten = require('@kingjs/array.nested.to-array');
var pluck = require('@kingjs/descriptor.pluck');
var copy = require('@kingjs/mutate.copy');
var updatePath = require('@kingjs/mutate.path');
var aggregate = require('@kingjs/linq.aggregate');
var makeEnumerable = require('@kingjs/array.make-enumerable');
var inherit = require('@kingjs/poset.inherit');
var decode = require('@kingjs/poset.decode');

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

function transform(action) {
  action = normalizeAction(action);

  var result = { };
  var families = { };
  var bases = { };

  return apply.call(this,
    flatten, null,
    makeEnumerable, null,
    aggregate, [families, function() {
      for (var name in this) {
        bases[name] = this.split('$');
        name = bases.shift();
      }

      var depends = action.depends || emptyObject;
      for (var name in depends) {
        var selector = depends[name] || returnThis;

      }

      families[name] = descriptor;
      return families;
    }],
    updatePath, [action.refs, resolve]
  );
}

Object.defineProperties(module, {
  exports: { value: transform }
});