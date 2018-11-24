
var stringEx = require('@kingjs/string-ex');
var objectEx = require('@kingjs/object-ex');
var assert = require('@kingjs/assert');
var is = require('@kingjs/is');

var cap = stringEx.capitalize;

function defineChildren(target, children) {
  for (var name in children) {
    objectEx.defineFunction(
      target,
      'add' + cap(name),
      function(descriptors) { 
        this.addChildrenOfType(name, descriptors) 
      },
    );
  }
}

Object.defineProperties(module, {
  exports: { value: defineChildren }
});