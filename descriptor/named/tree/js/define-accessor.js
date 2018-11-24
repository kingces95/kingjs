'use strict';

var Node = require('./node');
var stringEx = require('@kingjs/string-ex');
var objectEx = require('@kingjs/object-ex');
var assert = require('@kingjs/assert');
var is = require('@kingjs/is');

function defineAccessor(target, name, accessor) {    
  var type = accessor.type;
  if (type == Boolean)
    name = 'is' + stringEx.capitalize(name);

  defineAccessorHelper(target, name, accessor);

  return name;
}
  
function defineAccessorHelper(target, name, accessor) {    
  var type = accessor.type;
  
  if ('value' in accessor) {
    objectEx.defineField(target, name, accessor.value);
    return;
  }

  var get = accessor.get;
  if (get) {
    objectEx.defineAccessor(target, name, get);
    return;
  }
           
  var ancestor = accessor.ancestor;
  if (ancestor) {
    assert(is.function(type));
    assert(type == Node || type.prototype instanceof Node);

    objectEx.defineLazyAccessor(target, name, 
      function() { 
        return this.getAncestor(type); 
      }
    );

    return;
  }

  var ref = accessor.ref;
  if (ref) {
    var dfault = accessor.default;
    objectEx.defineReference(target, name, {
      enumerable: true,
      configurable: false,
      default: dfault,
      value: function(address) { 
        var result = this.resolve(address); 
        assert(result === null || result instanceof type);
        return result;
      },
    });
    return;
  }
}

Object.defineProperties(module, {
  exports: { value: defineAccessor }
});