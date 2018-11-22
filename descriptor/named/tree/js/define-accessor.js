'use strict';

var Node = require('./node');
var stringEx = require('@kingjs/string-ex');
var objectEx = require('@kingjs/object-ex');
var assert = require('@kingjs/assert');
var is = require('@kingjs/is');

function defineTypedReference(target, name, type, dfault) {

  objectEx.defineReference(target, name, 
    function(address) { 
      var result = this.resolve(address); 
      assert(result instanceof type);
      return result;
    },
    dfault
  );
}

function defineAccessor(target, name, accessor) {    
  var type = accessor.type;
  if (type == Boolean)
    name = 'is' + stringEx.capitalize(name);

  defineAccessorHelper(target, name, accessor);

  return name;
}
  
function defineAccessorHelper(target, name, accessor) {    
  var type = accessor.type;
  
  if ('value' in accessor)
    return objectEx.defineField(target, name, accessor.value);

  var get = accessor.get;
  if (get)
    return objectEx.defineAccessor(target, name, get);
           
  var ancestor = accessor.ancestor;
  if (ancestor) {
    assert(is.function(type));
    assert(type == Node || type.prototype instanceof Node);

    return objectEx.defineLazyAccessor(target, name, 
      function() { 
        return this.getAncestor(type); 
      }
    );
  }

  var ref = accessor.ref;
  if (ref) {
    var dfault = accessor.dfault;
    return defineTypedReference(target, name, type, dfault);
  }
}

Object.defineProperties(module, {
  exports: { value: defineAccessor }
});