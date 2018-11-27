'use strict';

var assert = require('@kingjs/assert');
var is = require('@kingjs/is');
var objectEx = require('@kingjs/object-ex');
var Node = require('../node');
var defineSchema = require('../define-schema');

defineSchema(exports, [
  {
    name: 'JavascriptNode'
  }, {
    name: 'Member',
    base: 'JavascriptNode',
    flags: {
      intrinsic: false,
      public: false,
      private: '!this.public',
    },
    accessors: { 
      $defaults: { ancestor: true },
      loader: 'Loader',
      scope: 'Member',
      declaringType: 'Type',
      package: 'Package'
    },
  }, {
    name: 'Property',
    base: 'Member',
    flags: { 
      static: false,
      enumerable: false,
      configurable: false,
    },
    accessors: { 
      type: { type: 'Type', ref: true } 
    },
  }, {
    name: 'Field',
    base: 'Property',
    wrap: 'value',
    flags: { 
      writable: false,
    },
    accessors: { 
      value: { func: Object },
    },
  }, {
    name: 'Method',
    base: 'Property',
    wrap: 'func',
    flags: { 
      extension: false,
      abstract: 'this.value === undefined',
      writable: false,
    },
    accessors: { 
      extendedType: { type: 'Type', ref: true },
      value: { func: Function }
    },
  }, {
    name: 'Accessor',
    base: 'Property',
    wrap: 'get',
    flags: { 
      extension: false,
      abstract: 'this.get === null',
      writable: 'this.set !== undefined',
    },
    accessors: { 
      extendedType: { type: 'Type', ref: true },
      get: { func: Function },
      set: { func: Function },
    },
  }, {
    name: 'Type', 
    base: 'Member',
  }, {
    name: 'Class',
    base: 'Type',
    wrap: 'func',
    flags: { 
      abstract: false,
    },
    accessors: [{ 
      func: { func: Function }
    }, {
      $defaults: { ref: true },
      base: { type: 'Class', default: 'Object' },
      implements: { type: 'Interface', array: true },
    }],
    children: {
      classes: 'Class',
      interfaces: 'Interface',
      methods: 'Method',
      accessors: 'Accessor',
      fields: 'Field',
    },
    methods: {
      $defaults: { lazy: true },
      load: require('./load-type')
    }
  }, {
    name: 'Interface',
    base: 'Type',
    flags: {
      abstract: true,
    },
    accessors: {
      extends: { func: 'Interface', array: true, dep: true },
    },
    children: [{
      $defaults: {
        defaults: {
          abstract: true
        }
      },
      methods: 'Method',
      accessors: 'Accessor'
    }, {
      $defaults: {
        defaults: {
          extension: true,
          static: true,
        }
      },
      extensionMethods: 'Method',
      extensionAccessors: 'Accessor',
    }],
  }, {
    name: 'Loader',
    base: 'JavascriptNode',
    children: {
      packages: 'Package',
      classes: 'Class',
    },
  }, {
    name: 'Package',
    wrap: 'func',
    base: 'JavascriptNode',
    accessors: {
      func: { type: Function },
    },
    children: [{
      interfaces: 'Interface',
      classes: 'Class',
    }, {
      $defaults: { static: true },
      methods: 'Method',
      accessors: 'Accessor',
      fields: 'Field',
    }],
  },
]);

// builtin types

var JavascriptNode = exports.JavascriptNode;
var Loader = exports.Loader;

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

objectEx.defineStaticField(Loader, 'builtIn',
  new Loader(null, null, {
    classes: [
      constantTypes,
      primitiveTypes,
      builtInClasses
    ]
  })
);

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