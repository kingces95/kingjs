'use strict';

var assert = require('assert')

var KingJs = Symbol[Symbol.for('@kingjs')]

var { 
  Identity,
  IPolymorphic,
  Polymorphisms,
  DefineExtension
} = KingJs;

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

KingJs.AddPolymorphism = IPolymorphic[DefineExtension](
  addPolymorphism.name,
  addPolymorphism
)
