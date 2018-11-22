'use strict';

var Node = require('./js/node');
var defineSchema = require('./js/define-schema');

defineSchema(exports, [
  {
    name: 'Member',
    flags: {
      intrinsic: false,
      public: false,
      private: '!this.public',
      global: 'this.scope.isModule',
    },
    accessors: { 
      $defaults: { ancestor: true },
      scope: 'Member',
      declaringType: 'Type',
      module: 'Module'
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
      type: { func: 'Type', ref: true } 
    },
    methods: {
      onLoad: function(descriptor) {
        Logger.log([
          this.isStatic ? 'static' : '', 
          this.fullName
        ].filter(function(o) { return o != ''; }).join(' '));
        
        if (!descriptor)
          return;
        
        if (!this.parent.func)
          return;
        
        descriptor.enumerable = this.isEnumerable;
        descriptor.configurable = this.isConfigurable;
        
        Logger.log(['->', JSON.stringify(descriptor, function(k, o) {
          if (!o)
            return o;
          
          if (isFunction(o))
            return ['function', o.name].join(' ');
          
          return o;
        }, 2)].join(' '));
        
        var target = this.parent.func;
        if (!this.isStatic)
          target = target.prototype;
        
        Object.defineProperty(target, this.name, descriptor)
      },
      getValue: function(target) { return target[name]; },
    }
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
    methods: {
      onLoad: function() {
        Property.prototype.onLoad.call(this, { 
          value: this.value,
          writable: this.isWritable
        });
      },
      setValue: function(target, value) { target[this.name] = value; },
//      toString: function() { 
//        var typeCtor = this.type || null;
//        var typeName = typeCtor ? typeCtor.name : '?';
//        return [typeName, this.name, '=', 'value' in this].join(' '); 
//      }
    }
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
      extendedType: { func: 'Type', ref: true },
      value: { func: Function }
    },
    methods: {
      onLoad: function() {
        Assert.that(this.isAbstract || isFunction(this.value));
        Property.prototype.onLoad.call(this, { 
          value: this.value,
          writable: this.isWritable
        });
      },
      apply: function(target, args) { return value.apply(target, args); },
      call: function(target) { return value.call(target, arguments.shift(1)); },
    }
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
      extendedType: { func: 'Type', ref: true },
      get: { func: Function },
      set: { func: Function },
    },
    methods: {
      onLoad: function() {
        Property.prototype.onLoad.call(this, { 
          get: this.get,
          set: this.set
        });
      },
      setValue: function(target, value) { target[name] = value; },
    }
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
      base: { func: 'Class', default: 'intrinsic.Object' },
      implements: { func: 'Interface', array: true },
    },
    children: {
      classes: 'Class',
      interfaces: 'Interface',
      methods: 'Method',
      accessors: 'Accessor',
      fields: 'Field',
    },
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
    name: 'Scope',
    wrap: 'value',
    accessors: {
      func: { func: Function }
    },
    children: {
      $defaults: { 
        defaults: { static: true }
      },
      methods: 'Method',
      accessors: 'Accessor',
      fields: 'Field',
    },
  }, {
    name: 'Global',
    base: 'Scope',
  }, {
    name: 'Module',
    base: 'Scope',
    children: {
      interfaces: 'Interface',
      classes: 'Class',
    },
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
      if (!prototype.propertyIsEnumerable(own[i]))
        continue;
      console.log(indent + own[i]); 
    }
    prototype = Object.getPrototypeOf(prototype);
  }

}