'use strict';

var assert = require('@kingjs/assert');
var is = require('@kingjs/is');
var objectEx = require('@kingjs/object-ex');
var Node = require('../node');
var schema = require('./schema');

var JavascriptNode = schema.JavascriptNode;
var Loader = schema.Loader;

function create() {
  var loader = new Loader();

  objectEx.defineField(
    loader, 
    'children', 
    Object.create(Loader.builtIn.children)
  );

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

var builtInTypes = Loader.builtIn.children;
Object.freeze(builtInTypes);

for (var name in builtInTypes)
  objectEx.defineStaticField(Loader, name, builtInTypes[name]);

objectEx.defineFunction(JavascriptNode.prototype, 
  function resolve(ref) {
    if (is.function(ref)) {
      for (name in builtInTypes) {
        var type = builtInTypes[name];
        if (ref == type.func)
          return type;
      }
      return undefined;
    }

    return Node.prototype.resolve.call(this, ref);
  }
);

assert(Loader.builtIn.resolve('Object') == Loader.Object);
assert(Loader.builtIn.resolve(Object) == Loader.Object);
assert(Loader.Array.base == Loader.Object);

for (var name in exports) {
  var ctor = exports[name];
  var indent = '';
  var prototype = ctor.prototype;
  while (prototype != Node.prototype) {
    ctor = prototype.constructor;
    console.log(indent + '--' + ctor.name);
    indent += '  ';
    var own = Object.getOwnPropertyNames(prototype);
    for (var i = 0; i < own.length; i ++) {
      if (own[i] == 'constructor') continue;
      var isEnumerable = prototype.propertyIsEnumerable(own[i]);
      console.log(indent + own[i] + (isEnumerable ? '' : '()')); 
    }
    prototype = Object.getPrototypeOf(prototype);
  }
}

Object.defineProperties(module, {
  exports: { value: create }
});