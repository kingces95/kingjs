'use strict';

var is = require('@kingjs/is');
var defineSchema = require('../define-schema');
var interfaceLoad = require('./type/interface/load');
var classLoad = require('./type/class/load');

var methodLoad = require('./method/load');
var methodInit = require('./method/init');

var createPolymorphisms = require('./type/polymorphisms');
var createVtable = require('./type/class/vtable');
var createInterfaceMap = require('./type/class/interfaceMap');

defineSchema(exports, [{

    // JavascriptNode
    name: 'JavascriptNode',
  }, {

    // Member
    name: 'Member',
    base: 'JavascriptNode',
    flags: {
      intrinsic: false,
      public: false,
      private: '!this.public',
    },
    accessors: [{ 
      $defaults: { ancestor: true },
      loader: 'Loader',
      scope: 'Member',
      declaringType: 'Type',
      package: 'Package'
    }],
  }, {

    // Property
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

    // Field
    name: 'Field',
    base: 'Property',
    wrap: 'value',
    flags: { 
      writable: false,
    },
    accessors: { 
      value: { /* write-once */ },
    },
  }, {

    // Procedural
    name: 'Procedural',
    base: 'Property',
    flags: {
      extension: '!!this.extends',
    },
    accessors: {
      extends: { type: 'Type', ref: true, default: null }
    },
  }, {

    // Method
    name: 'Method',
    base: 'Procedural',
    init: methodInit,
    wrap: 'func',
    flags: { 
      abstract: '!this.load()',
      getter: false,
      setter: false,
    },
    methods: { 
      $defaults: { initializer: 'func', default: null },
      load: methodLoad,
    },
  }, {

    // AccessorMethod
    name: 'AccessorMethod',
    base: 'Method',
    accessors: { 
      declaringAccessor: { type: 'Accessor', ancestor: true }
    }, 
  }, {

    // Getter
    name: 'Getter',
    base: 'AccessorMethod',
    wrap: 'func',
   }, {

    // Setter
    name: 'Setter',
    base: 'AccessorMethod',
    wrap: 'func',
  }, {

    // Accessor
    name: 'Accessor',
    base: 'Procedural',
    wrap: 'get',
    flags: { 
      abstract: 'this[this.get ? "get" : "set"].isAbstract',
      writable: '!!this.set',
    },
    children: {
      $defaults: { singleton: true },
      get: { type: 'Getter' },
      set: { type: 'Setter' },
    },
  }, {

    // Type
    name: 'Type', 
    base: 'Member',
    accessors: { 
      $defaults: { lazy: true, type: Object },
      polymorphisms: { get: createPolymorphisms },
    },
    methods: {
      canCastTo: function(type) {
        return type && type.id in this.polymorphisms;
      },
      hasInstance: function(instance) {
        var info = this.loader.getType(instance);
        return info && info.canCastTo(this);
      }
    }
  }, {

    // Class
    name: 'Class',
    base: 'Type',
    wrap: 'func',
    flags: { 
      abstract: false,
    },
    accessors: [{
      $defaults: { lazy: true },
      interfaceMap: { get: createInterfaceMap },
      vtable: { get: createVtable },
    }, {
      $defaults: { ref: true },
      base: { type: 'Class', default: 'Extendable' },
      implements: { type: 'Interface', array: true, default: null },
    }],
    methods: { 
      $defaults: { initializer: 'func', default: null },
      load: classLoad,
    },
    children: [{
      classes: 'Class',
      interfaces: 'Interface',
      fields: 'Field',
    }, {
      // defer to allow an interface method implementation's 
      // name to be resolved to the interface method id.
      $defaults: { defer: true },
      methods: 'Method',
      accessors: 'Accessor',
    }],
  }, {

    // Interface
    name: 'Interface',
    base: 'Type',
    flags: {
      abstract: true,
    },
    accessors: {
      $defaults: { ref: true },
      extends: { type: 'Interface', array: true, default: null },
    },
    methods: { 
      $defaults: { lazy: true },
      load: interfaceLoad,
    }, 
    children: {
      methods: 'Method',
      accessors: 'Accessor'
    },
  }, {

    // Loader
    name: 'Loader',
    base: 'JavascriptNode',
    accessors: {
      infoSymbol: { value: Symbol('@kingjs/loader.info'), static: true },
      prototype: { value: { } },
    },
    methods: {
      getType: function(instance) {
        if (!is.object(instance))
          return undefined;
        return instance.constructor[this.infoSymbol];
      }
    },
    children: [{
      packages: 'Package',
      interfaces: 'Interface',
      classes: 'Class',
    }, {
      $defaults: { 
        // defer allows an extension method's stub to resolve its type id
        defer: true,
        defaults: { static: true },
      },
      methods: 'Method',
      accessors: 'Accessor',
    }]
  }, {

    // Package
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
      fields: {
        type: 'Field',
        defaults: { static: true }
      },
    }, {
      $defaults: { 
        defaults: { static: true },
        // defer allows an extension method's stub to resolve its type id
        defer: true
      },
      methods: 'Method',
      accessors: 'Accessor',
    }],
  },
]);

return;

var Node = require('../node');

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