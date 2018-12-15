'use strict';

var assert = require('@kingjs/assert');
var is = require('@kingjs/is');
var objectEx = require('@kingjs/object-ex');
var Node = require('../node');
var schema = require('./schema');

var JavascriptNode = schema.JavascriptNode;
var Loader = schema.Loader;

function create(children) {
  var loader = new Loader();

  objectEx.defineField(
    loader, 
    'children', 
    Object.create(Loader.builtIn.children)
  );

  if (children)
    loader.addChildren(children);

  return loader;
}

var constantTypes = {
  $defaults: {
    base: null,
    func: null,
    primitive: true,
  },
  Null: null,
  Undefined: null,
};

function Interface() { }
Interface.prototype = null;

var primitiveTypes = {
  $defaults: {
    base: null,
    primitive: true,
  },
  Object: Object,
  Number: Number,
  Boolean: Boolean,
  Symbol: Symbol,
  Interface: Interface,
};

var builtInClasses = {
  $defaults: {
    base: 'Object'
  },
  String: String,
  Array: Array
}

objectEx.defineStaticField(Loader, 'builtIn',
  new Loader(null, null)
);

Loader.builtIn.addChildren({
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

var builtInTypes = Loader.builtIn.children;
Object.freeze(builtInTypes);

for (var name in builtInTypes) {
  var type = builtInTypes[name];
  objectEx.defineStaticField(Loader, name, type);
  if (type.func)
    objectEx.defineHiddenField(type.func, Loader.infoSymbol, type);
}

objectEx.defineFunction(JavascriptNode.prototype, 
  function resolve(ref) {
    if (is.function(ref))
      return ref[Loader.infoSymbol];

    return Node.prototype.resolve.call(this, ref);
  }
);

assert(Loader.builtIn.resolve('Object') == Loader.Object);
assert(Loader.builtIn.resolve(Object) == Loader.Object);
assert(Loader.Array.base == Loader.Object);

Object.defineProperties(module, {
  exports: { value: create }
});