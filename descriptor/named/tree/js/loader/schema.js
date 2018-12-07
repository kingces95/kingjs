'use strict';

var defineSchema = require('../define-schema');
var loadType = require('./load-type');
var initType = require('./init-type');
var createVtable = require('./create-vtable');

defineSchema(exports, [
  {
    name: 'JavascriptNode',
    accessors: {
      id: { get: 'Symbol(this.fullName)', lazy: true }
    }
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
    accessors: { 
      vtable: { type: Object, get: createVtable, lazy: true }
    },
  }, {
    name: 'Class',
    base: 'Type',
    init: initType,
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
      load: loadType
    }
  }, {
    name: 'Interface',
    base: 'Type',
    flags: {
      abstract: true,
    },
    accessors: {
      extends: { type: 'Interface', array: true, ref: true, default: null },
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