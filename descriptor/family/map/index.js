var apply = require('@kingjs/apply');
var toArray = require('@kingjs/array.nested.to-array');
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


function resolve(value) {
  if (typeof value != 'string')
    return value;

  return this[value];
}

function decodeAndInherit() {
  var vertexProperties = { };
  return apply.call(this,
    decode, [vertexProperties],
    inherit, [vertexProperties]
  );
}

function mapDescriptor(action) {
  if (action instanceof Function)
    action = { callback: action };
    
  var result = { };

  var names = Object.keys(this);
  for (var i = 0; i < names.length; i ++) {
    var name = names[i];
    result[name] = callback(this[name], name, this);
  }

  return result; 
}

function mapDescriptorPile(action) {
  if (action instanceof Function)
    action = { callback: action };

  var actionMetadata = Object.create(metadata);
  action = pluck.call(action, /* out */ actionMetadata);

  return apply.call(this,
    toArray, null,
    makeEnumerable, null,
    aggregate, [{ }, function(descriptor) {
      var descriptorMetadata = Object.create(actionMetadata);
      descriptor = pluck.call(descriptor, /* out */ descriptorMetadata);

      return apply.call(descriptor,
        simpleMap, [function(x) { return copy.call(x, descriptorMetadata.$defaults, true); }],
        simpleMap, [function(x) { return copy.call(x, actionMetadata.$defaults, true); }],
        simpleMap, [action.callback]
      );
    }],
    updatePath, [actionMetadata.$refs, resolve]
  );
}

Object.defineProperties(module, {
  exports: { value: mapDescriptorPile }
});