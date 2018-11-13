'use strict';

var assert = require('@kingjs/assert');
var Dictionary = require('@kingjs/Dictionary');
var is = require('@kingjs/is');
var epilog = require('@kingjs/descriptor.object.epilog');
var takeLeft = require('@kingjs/func.return-arg-0');
var merge = require('@kingjs/descriptor.merge');
var inherit = require('@kingjs/descriptor.inherit');

var poset = {
  decode: require('@kingjs/poset.decode'),
  inherit: require('@kingjs/poset.inherit')
}

function decodeAndInherit(encodedPoset) {
  if (!encodedPoset)
    return null;

  var vertices = { };
  var edges = poset.decode.call(encodedPoset, vertices);
  return poset.inherit.call(edges, vertices);
}

function wrap(descriptor, wrap) {

  if (is.object(descriptor))
    return descriptor;

  // declarative
  if (is.string(wrap)) {
    var dictionary = new Dictionary();
    dictionary[wrap] = descriptor;
    return dictionary;
  }

  // procedural
  if (is.function(wrap))
    return wrap(descriptor);

  assert('Bad wrap type.');
}

function create(descriptor, action) {

  // 1. Wrap
  if (action.wrap) 
    descriptor = wrap(descriptor, action.wrap);

  // 2. Inherit
  if (action.bases) {
    var namedBases = decodeAndInherit(action.basePoset);
    
    var bases = action.bases;
    if (namedBases)
      bases = bases.map(o => is.string(o) ? namedBases[o] : o);

    descriptor = inherit.call(
      descriptor, 
      bases
    );
  }

  // 3. Defaults
  if (action.defaults) {
    descriptor = merge.call(
      descriptor, 
      action.defaults,
      takeLeft
    );
  }
  
  return descriptor;
}

Object.defineProperties(module, {
  exports: { 
    value: function(descriptor, action) {
      if (descriptor === undefined)
        descriptor = new Dictionary();
      else if (action)
        descriptor = create(descriptor, action);
      return epilog.call(descriptor);
    }
  }
});