//'use strict';

var assert = require('@kingjs/assert');

function createPolymorphisms() {
  assert(this.isType || this.isInterface);

  // add inherited polymorphisms
  var basePolymorphisms = null;
  if (this.base)
    basePolymorphisms = this.base.polymorphisms;
  var polymorphisms = Object.create(basePolymorphisms);

  // add implementation or extension polymorphisms (and self)
  addType.call(polymorphisms, this);

  return polymorphisms;
}

function addType(type) {
  this[type.id] = type;
  
  var interfaces = type.isClass ? type.implements : type.extends;
  if (!interfaces)
    return;

  // traverse the extension poset
  for (var i = 0; i < interfaces.length; i++) {
    var interface = interfaces[i];
    assert(interface.isInterface);
    addType.call(this, interface);
  }
}

Object.defineProperties(module, {
  exports: { value: createPolymorphisms }
});