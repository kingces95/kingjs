'use strict';

var defineSchema = require('../define-schema');
var classLoad = require('./class-load');
var proceduralInit = require('./procedural-init');
var createVtable = require('./vtable-create');
var interfaceTrack = require('./interface-track');

defineSchema(exports, [
  {
    // JavascriptNode
    name: 'JavascriptNode',
    accessors: {
      id: { get: 'Symbol(this.fullName)', lazy: true }
    },
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
    init: proceduralInit,
    flags: {
      extension: false,
    },
    accessors: {
      extends: { type: 'Type', ref: true }
    },
  }, {

    // Method
    name: 'Method',
    base: 'Procedural',
    wrap: 'func',
    flags: { 
      abstract: 'this.value === undefined',
    },
    accessors: {
      value: { func: Function },
    },
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
      vtable: { type: Object, get: createVtable, lazy: true }
    },
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
    children: {
      classes: 'Class',
      interfaces: 'Interface',
      methods: 'Method',
      accessors: 'Accessor',
      fields: 'Field',
    },
    methods: {
      $defaults: { lazy: true },
      load: classLoad
    }
  }, {

    // Interface
    name: 'Interface',
    base: 'Type',
    flags: {
      abstract: true,
    },
    accessors: {
      implementations: { get: '{ }', lazy: true },
      extensions: { get: '{ }', lazy: true },
      extends: { type: 'Interface', array: true, ref: true, default: null },
    },
    methods: {
      track: interfaceTrack,
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

    // Loader
    name: 'Loader',
    base: 'JavascriptNode',
    children: [{
      packages: 'Package',
      interfaces: 'Interface',
      classes: 'Class',
    }, {
      $defaults: { static: true },
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
      $defaults: { static: true },
      methods: 'Method',
      accessors: 'Accessor',
      fields: 'Field',
    }],
  },
]);