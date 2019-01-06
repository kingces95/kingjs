'use strict';

var {
  '@kingjs/define-interface': defineInterface,
} = require('@kingjs/require-packages').call(module);

var defineExtension = require('./define-extension');

var {
  IPolymorphic,
  addPolymorphism
} = defineInterface;

// javascript functions are intrinsically polymorphic as
// any javascript instance can implement any interface.
// e.g. Array and String are intrinsically IIterable
// no Function can "implement" an interface before this point
Function[Polymorphisms] = { [IPolymorphic]: IPolymorphic }

// defineExtension(this IPolymorphic, name: string, extension: function)
var DefineExtension = defineExtension.call(IPolymorphic, defineExtension);

// addPolymorphism(this IPolymorphic, polymorphism: function)
var AddPolymorphism = defineExtension.call(IPolymorphic, addPolymorphism);

// Array : IIterable
require('./shim-array');

// String : IIterable
require('./shim-string');

// Generator : IIterable, IEnumerable
require('./shim-generator');

Symbol.kingjs = module.exports = { 
  DefineExtension,
  AddPolymorphism,

  IPolymorphic,
  IPolymorphic: { Polymorphisms },
};