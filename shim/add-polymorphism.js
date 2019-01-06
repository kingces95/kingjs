'use strict';

var assert = require('assert')

var { 
  Identity,
  IPolymorphic,
  Polymorphisms,
  DefineExtension
} = Symbol.kingjs;

function addPolymorphism(polymorphism) {
  assert(typeof this == 'function');
  assert(typeof polymorphism == 'function');
  //assert(polymorphism instanceof IIdentifiable);

  var polymorphisms = this[Polymorphisms];
  if (!polymorphisms)
    this[Polymorphisms] = polymorphisms = Object.create(null);

  polymorphisms[polymorphism[Identity]] = polymorphism;
}

// make Function IPolymorphic (bootstrap)
addPolymorphism.call(Function, IPolymorphic);
assert((function () { }) instanceof IPolymorphic);

Symbol.kingjs.AddPolymorphism = IPolymorphic[DefineExtension](
  addPolymorphism
)
