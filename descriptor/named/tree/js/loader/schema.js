'use strict';

var is = require('@kingjs/is');
var defineSchema = require('../define-schema');
var typeLoad = require('./type-load');
var methodInit = require('./method-init');
var methodBase = require('./method-base');
var createVtable = require('./vtable-create');

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
      value: { func: Object },
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
      abstract: 'this.func === null',
    },
    accessors: [{
      func: { func: Function },
    }, { 
      $defaults: { lazy: true },
      base: { get: methodBase }
    }],
  }, {

    // Accessor
    name: 'Accessor',
    base: 'Procedural',
    wrap: 'get',
    flags: { 
      abstract: 'this.get === null',
      writable: 'this.set !== undefined',
    },
    accessors: { 
      get: { func: Function },
      set: { func: Function },
    },
  }, {

    // Type
    name: 'Type', 
    base: 'Member',
    accessors: { 
      $defaults: { lazy: true, type: Object },
      vtable: { get: createVtable },
      properties: { 
        get: 'Object.create(this.base ? this.base.properties : null)' 
      }
    },
    methods: [{
      $defaults: { lazy: true },
      load: typeLoad
    }, {
      canCastTo: function(type) {
        return type && type.id in this.vtable;
      },
      hasInstance: function(instance) {
        var info = this.loader.getType(instance);
        return info && info.canCastTo(this);
      }
    }]
  }, {

    // Class
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
      implements: { type: 'Interface', array: true, default: null },
    }],
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
    accessors: [{
      $defaults: { get: '{ }', lazy: true },
      implementations: { },
      extensions: { },
    }, {
      $defaults: { ref: true },
      extends: { type: 'Interface', array: true, default: null },
      base: { type: 'Class', default: 'Interface' },
    }],
    children: [{
      $defaults: {
        defaults: {
          abstract: true
        }
      },
      methods: 'Method',
      accessors: 'Accessor'
    }],
  }, {

    // Loader
    name: 'Loader',
    base: 'JavascriptNode',
    accessors: {
      infoSymbol: { value: Symbol('@kingjs/loader.info'), static: true },
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