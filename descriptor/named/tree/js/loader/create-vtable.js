//'use strict';

var assert = require('@kingjs/assert');

function createVtable() {
  assert(this.isType || this.isInterface);

  var prototype = null;
  if (this.base)
    prototype = this.base.vtable;

  var vtable = Object.create(prototype);

  addType.call(vtable, this);

  return vtable;
}

function addType(type) {
  var id = type.id;
  if (id in this) {
    assert(type.isInterface);
    return;
  }
  
  this[id] = type;
  assert(id in this);
  
  var interfaces = type.isClass ? type.implements : type.extends;
  if (!interfaces)
    return;

  for (var i = 0; i < interfaces.length; i++)
    addType.call(this, interfaces[i]);
}


Object.defineProperties(module, {
  exports: { value: createVtable }
});