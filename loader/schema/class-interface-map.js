//'use strict';

var assert = require('@kingjs/assert');
var is = require('@kingjs/is');
var Dictionary = require('@kingjs/dictionary');

var implementationNotFoundError = "Implementation not found."
var methodImplementsAccessorError = "Method cannot implement interface accessor."
var accessorImplementsMethodError = "Accessor cannot implement interface method."
var explicitImplementationNoIfaceError = "Cannot explicitly implement method on unimplemented interface."
var noGetterImplementationError = "Interface accessor implementation must implement getter."
var noSetterImplementationError = "Interface accessor implementation must implement setter."

function createInterfaceMap() {
  var map = new Dictionary();
  var baseMap = this.base ? this.base.interfaceMap : new Dictionary();
  var baseVtable = this.base ? this.base.vtable : null;

  var polymorphisms = this.polymorphisms;
  for (var id of Object.getOwnPropertySymbols(polymorphisms)) {
    var type = polymorphisms[id];
    if (!type.isInterface)
      continue;

    for (var name in type.children) {
      var slot = type.children[name];
      if (!slot.isProcedural)
        continue;

      // explicit implementation
      var member = this.children[slot.id];

      // implicit implementation
      if (!member)
        member = this.children[slot.name];

      // inherited implementation
      if (!member)
        member = baseMap[slot.id];

      // inherited implicit implementation
      if (!member && baseVtable)
        member = baseVtable[slot.name];

      setSlot.call(this, map, slot, member);
    }
  }

  // throw on explicit implementation of non-implemented interface
  for (var id of Object.getOwnPropertySymbols(this.children)) {
    var slot = this.children[id];
    assert(slot.isProcedural);
    assert(id in map, explicitImplementationNoIfaceError);
  }

  // copy any remaining base implementations
  for (var id of Object.getOwnPropertySymbols(baseMap)) {
    if (id in map)
      continue;

    // inherit base implementations
    var baseMember = baseMap[id];
    var member = baseMember;

    // replace base implementation when its abstract or implicit
    var slot = this.loader.resolve(id);
    var name = slot.name;
    if (name in this.children && (!baseMember || is.string(baseMember.name)))
        member = this.children[name];

    setSlot.call(this, map, slot, member);
  }

  return map;
}

function setSlot(map, slot, member) {

  if (!this.isAbstract) {
    assert(member, implementationNotFoundError);
    assert(member.isProcedural);
    if (slot.isMethod) {
      assert(member.isMethod, methodImplementsAccessorError);
    }
    else {
      assert(slot.isAccessor);
      assert(!slot.get || member.get, noGetterImplementationError);
      assert(!slot.set || member.set, noSetterImplementationError);
      assert(member.isAccessor , accessorImplementsMethodError);
    }
  } 

  map[slot.id] = member;    
}

Object.defineProperties(module, {
  exports: { value: createInterfaceMap }
});