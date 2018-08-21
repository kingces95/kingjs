var apply = require('@kingjs/apply');
var toArray = require('@kingjs/array.nested.to-array');
var pluck = require('@kingjs/descriptor.pluck');
var copy = require('@kingjs/mutate.copy');
var updatePath = require('@kingjs/mutate.path');
var aggregate = require('@kingjs/linq.aggregate');
var makeEnumerable = require('@kingjs/array.make-enumerable');

var metadata = {
  $refs: undefined
}

function simpleMap(callback) {
  var result = { };

  var names = Object.keys(this);
  for (var i = 0; i < names.length; i ++) {
    var name = names[i];
    result[name] = callback(this[name], name, this);
  }

  return result; 
}

function resolve(value) {
  if (typeof value != 'string')
    return value;

  return this[value];
}

function mapDescriptor(action, meta) {
  var meta = Object.create(meta);

  var result = this;
  result = pluck.call(result, meta);
  result = simpleMap.call(result, action.callback);
  return result;
}

function mapDescriptorPile(action) {
  if (action instanceof Function)
    action = { callback: action };

  var meta = Object.create(metadata);
  action = pluck.call(action, meta);

  return apply.call(this,
    toArray, null,
    makeEnumerable, null,
    aggregate, [{ }, function(a, descriptor) {
      return copy.call(a, mapDescriptor.call(descriptor, action, meta))
    }],
    updatePath, [meta.$refs, resolve]
  );
}

Object.defineProperties(module, {
  exports: { value: mapDescriptorPile }
});