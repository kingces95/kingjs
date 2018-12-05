'use strict';

var Node = require('./node');
var stringEx = require('@kingjs/string-ex');
var objectEx = require('@kingjs/object-ex');
var assert = require('@kingjs/assert');
var write = require('@kingjs/descriptor.write')
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
    accessor = write.call(accessor, 'reference', true);
    accessor = write.call(accessor, 'get', function(address) { 
      var result = this.resolve(address); 
      assert(result === null || result instanceof type);
      return result;
    });
    objectEx.defineProperty(target, name, accessor);
    return;
  }
}

Object.defineProperties(module, {
  exports: { value: defineAccessor }
});