//'use strict';

var assert = require('@kingjs/assert');

var implementationNotFoundError = "Implementation not found."
var methodImplementsAccessorError = "Method cannot implement interface accessor."
var accessorImplementsMethodError = "Accessor cannot implement interface method."

function createInterfaceMap() {
  if (!this.base)
    return null;

  var map = { };
  var baseMap = this.base ? this.base.interfaceMap : { };

  for (var id in Object.getOwnPropertySymbols(this.polymorphisms)) {
    var type = this[id];
    if (!type.isInterface)
      continue;

    for (var name in type.children) {
      var slot = type.children[name];
      if (!slot.isProcedural)
        continue;

      // explicit implementation
      var value = this.children[slot.id];

      // implicit implementation
      if (!value)
        value = this.children[slot.name];

      // inherited implementation
      if (!value)
        value = baseMap[slot.id];

      assert(value, implementationNotFoundError);
      assert(value.isProcedural);
      assert(!value.isMethod || slot.isMethod, methodImplementsAccessorError);
      assert(!value.isAccessor || slot.isAccessor, accessorImplementsMethodError);

      map[slot.id] = value;
    }

    // copy any remaining base implementations
    for (var id in Object.getOwnPropertySymbols(baseMap)) {
      if (id in map)
        continue;

      map[id] = baseMap[id];
    }
  }

  return map;
}

Object.defineProperties(module, {
  exports: { value: createInterfaceMap }
});