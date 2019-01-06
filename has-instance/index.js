'use strict';

var assert = require('assert');

var Identity = Symbol.for('@kingjs/Identity');
var Polymorphisms = Symbol.for('@kingjs/Polymorphisms');

function hasInstance(instance) {
  var type = typeof instance;
  if (type != 'object' && type != 'string' && type != 'function')
    return false;

  var constructor = instance.constructor;
  if (!constructor || typeof constructor != 'function')
    return false;

  var polymorphisms = constructor[Polymorphisms];
  if (!polymorphisms)
    return false;

  var id = this[Identity];
  return id in polymorphisms;
}

function setIdentity(symbol) {
  assert(typeof this == 'function');

  if (!symbol)
    symbol = Symbol(this.name);

  assert(Identity in this == false || this[Identity] == symbol);
  this[Identity] = symbol;
}

function addPolymorphisms(...newPolymorphisms) {
  assert(typeof this == 'function');

  var polymorphisms = this[Polymorphisms];
  if (!polymorphisms)
    this[Polymorphisms] = polymorphisms = Object.create(null);

  for (var newPolymorphism of newPolymorphisms) {
    assert(Identity in newPolymorphism);
    polymorphisms[newPolymorphism[Identity]] = newPolymorphism;
  }
}

hasInstance.setIdentity = setIdentity;
hasInstance.addPolymorphisms = addPolymorphisms;
hasInstance.Identity = Identity;
hasInstance.Polymorphisms = Polymorphisms;

module.exports = hasInstance;