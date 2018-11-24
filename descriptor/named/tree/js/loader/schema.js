'use strict';

var Node = require('../node');
var defineSchema = require('../define-schema');

defineSchema(exports, [
  {
    name: 'Member',
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
    wrap: 'value',
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
      func: { func: Function }
    },
  }, {
    name: 'Class',
    base: 'Type',
    wrap: 'func',
    flags: { 
      abstract: false,
    },
    accessors: {
      $defaults: { ref: true },
      base: { type: 'Class', default: 'intrinsic.Object' },
      implements: { type: 'Interface', array: true },
    },
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
    children: {
      packages: 'Package',
    },
  }, {
    name: 'Package',
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