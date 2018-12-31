'use strict';

var assert = require('@kingjs/assert');
var is = require('@kingjs/is');

var Node = require('@kingjs/resolver');

// namespace
var namespaceFork = require('./namespace-fork');
var namespaceLoad = require('./namespace-load');

// method
var methodLoad = require('./method-load');
var methodInit = require('./method-init');

// type
var createPolymorphisms = require('./type-polymorphisms');

// interface
var interfaceLoad = require('./interface-load');

// class
var classLoad = require('./class-load');
var createVtable = require('./class-vtable');
var createInterfaceMap = require('./class-interface-map');

Node.define(exports, [{

    // JavascriptNode
    name: 'JavascriptNode',
    methods: {
      resolve: function(ref) {
        if (ref instanceof exports.JavascriptNode)
          return ref;
          
        if (is.function(ref))
          return ref[this.info];
    
        return Node.prototype.resolve.call(this, ref);
      },
    },
    accessors: {
      $defaults: { lazy: true },
      scope: 'this.parent',
      loader: 'this.root',
      info: 'this.loader.children.IReflectable.children.info.id',
    },
  }, {

    // Member
    name: 'Member',
    base: 'JavascriptNode',
    flags: {
      public: false,
      private: '!this.public',
    },
    accessors: { 
      $defaults: { ancestor: true },
      declaringType: { type: 'Type' },
      namespace: { type: 'Namespace' },
    },
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
      const: false,
      readOnly: false,
    },
    accessors: { 
      value: { value: null },
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
      $defaults: { 
        initializer: 'func', 
        default: null 
      },
      load: methodLoad,
    },
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

    // AccessorMethod
    name: 'AccessorMethod',
    base: 'Method',
    accessors: { 
      declaringAccessor: { 
        type: 'Accessor', 
        ancestor: true 
      }
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

    // Type
    name: 'Type', 
    base: 'Member',
    accessors: { 
      $defaults: { 
        lazy: true, 
        type: Object 
      },
      polymorphisms: createPolymorphisms,
    },
    methods: {
      canCastTo: function(type) {
        return type && type.id in this.polymorphisms;
      },
      hasInstance: function(instance) {
        if (is.nullOrUndefined(instance))
          return false;
        var info = instance[this.info];
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
      primitive: false,
      native: false,
      intrinsic: false,
    },
    accessors: [{
      $defaults: { lazy: true },
      interfaceMap: createInterfaceMap,
      vtable: createVtable,
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

    // Namespace
    name: 'Namespace',
    base: 'JavascriptNode',
    methods: {
      fork: namespaceFork,
      load: namespaceLoad,
    },
    children: {
      namespaces: 'Namespace',
      interfaces: 'Interface',
      classes: 'Class',
      methods: 'Method',
      accessors: 'Accessor',
    }
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