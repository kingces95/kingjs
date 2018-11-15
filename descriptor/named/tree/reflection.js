defineTree(this, {      
  Member: { 
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
  },
  Property: {
    base: 'Member',
    flags: { 
      static: false,
      enumerable: false,
      configurable: false,
    },
    accessors: { 
      type: { func: 'Type', ref: true, lazy: true } 
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
  },
  Field: {
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
      setValue: function(target, value) { target[name] = value; },
//      toString: function() { 
//        var typeCtor = this.type || null;
//        var typeName = typeCtor ? typeCtor.name : '?';
//        return [typeName, this.name, '=', 'value' in this].join(' '); 
//      }
    }
  },
  Method: {
    base: 'Property',
    wrap: 'value',
    flags: { 
      extension: false,
      abstract: 'this.value === undefined',
      writable: false,
    },
    accessors: { 
      extendedType: { func: 'Type', ref: true, lazy: true },
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
      apply: function(target, arguments) { return value.apply(target, arguments); },
      call: function(target) { return value.call(target, arguments.shift(1)); },
    }
  },
  Accessor: {
    base: 'Property',
    wrap: 'get',
    flags: { 
      extension: false,
      abstract: 'this.get === null',
      writable: 'this.set !== undefined',
    },
    accessors: { 
      extendedType: { func: 'Type', ref: true, lazy: true },
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
  },
  Type: { 
    base: 'Member',
    accessors: {
      func: { func: Function }
    },
  },
  Class: {
    base: 'Type',
    wrap: 'func',
    defaults: {
      base: 'intrinsic.Object' 
    },
    flags: { 
      abstract: false,
    },
    accessors: {
      base: { func: 'Class', ref: true },
      implements: { func: 'Interface', array: true, ref: true },
    },
    children: {
      classes: 'Class',
      interfaces: 'Interface',
      methods: 'Method',
      accessors: 'Accessor',
      fields: 'Field',
    },
  },
  Interface: {
    base: 'Type',
    flags: {
      abstract: true,
    },
    accessors: {
      extends: { func: 'Interface', array: true, ref: true },
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
  },
  Scope: {
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
  },
  Global: {
    base: 'Scope',
  },
  Module: {
    base: 'Scope',
    children: {
      interfaces: 'Interface',
      classes: 'Class',
    },
  },
});