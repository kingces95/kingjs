'use strict';

var assert = require('@kingjs/assert');
var is = require('@kingjs/is');
var objectEx = require('@kingjs/object-ex');
var Node = require('../node');
var schema = require('./schema');

var JavascriptNode = schema.JavascriptNode;
var Loader = schema.Loader;

var constantTypes = {
  $defaults: {
    base: null,
    func: null,
    primitive: true,
  },
  Null: null,
  Undefined: null,
};

var primitiveTypes = {
  $defaults: {
    base: null,
    primitive: true,
  },
  Object: Object,
  Number: Number,
  Boolean: Boolean,
  Symbol: Symbol,
};

var builtInClasses = {
  $defaults: {
    base: 'Object'
  },
  String: String,
  Array: Array
}

var builtIn = new Loader(null, null);

builtIn.addChildren({
  classes: [
    constantTypes,
    primitiveTypes,
    builtInClasses
  ]
});

for (name in builtInTypes) {
  var type = builtInTypes[name];
  if (ref == type.func)
    return type;
}

var builtInTypes = builtIn.children;
Object.freeze(builtInTypes);

objectEx.defineStaticField(Loader, 'builtIn', builtIn);

for (var name in builtInTypes) {
  var type = builtInTypes[name];
  objectEx.defineStaticField(Loader, name, type);
  if (type.func)
    objectEx.defineHiddenStaticField(type.func, Loader.infoSymbol, type);
}

objectEx.defineFunction(JavascriptNode.prototype, 
  function resolve(ref) {
    if (is.function(ref))
      return ref[Loader.infoSymbol];

    return Node.prototype.resolve.call(this, ref);
  }
);

assert(builtIn.resolve('Object') == Loader.Object);
assert(builtIn.resolve(Object) == Loader.Object);
assert(Loader.Array.base == Loader.Object);
assert(Array[Loader.infoSymbol] == Loader.Array);

Object.defineProperties(module, {
  exports: { value: Loader.builtIn }
});