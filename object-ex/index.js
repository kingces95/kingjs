var {
  ['@kingjs']: {
    propertyDescriptor: {
      createProperty, 
      createAccessor, 
      createField, 
    }
  }
} = dependencies('./dependencies');

var definitions = {

  'Field': {
    pluralName: 'Fields',
    pack: createField,
    defaults: { 
      configurable: false, 
      writable: false 
    },
    configurations: {
      'set': { configurable: true, enumerable: true, writable: true },
      'setHidden': { configurable: true, enumerable: false, writable: true },
      'setConst': { configurable: true, enumerable: true },
      'setHiddenConst': { configurable: true, enumerable: false },

      'define': { enumerable: true, writable: true },
      'defineHidden': { enumerable: false, writable: true },
      'defineConst': { enumerable: true },
      'defineHiddenConst': { enumerable: false },
    },
  },

  'Property': {
    pluralName: 'Properties',
    pack: createProperty,
    defaults: { 
      configurable: false 
    },
    configurations: {
      'define': { enumerable: false },
    }
  },

  'Function': {
    pluralName: 'Functions',
    pack: createProperty,
    defaults: { 
      function: true,
      configurable: false, 
      enumerable: false, 
      writable: false, 
    },
    configurations: {
      'define': { },
      'defineLazy': { future: true },
      'defineLazyStatic': { future: true, static: true },
    },
  },

  'Accessor': {
    pluralName: 'Accessors',
    pack: createAccessor,
    defaults: { 
      configurable: false,
      enumerable: true,
    },
    configurations: {
      'set': { configurable: true },
      'setHidden': { configurable: true, enumerable: false },

      'setLazy': { configurable: true, future: true },
      'setHiddenLazy': { configurable: true, enumerable: false, future: true, static: true },
      'setLazyStatic': { configurable: true, future: true },
      'setHiddenLazyStatic': { configurable: true, enumerable: false, future: true, static: true },

      'define': { },
      'defineHidden': { enumerable: false },

      'defineLazy': { future: true },
      'defineHiddenLazy': { enumerable: false, future: true },
      'defineLazyStatic': { future: true, static: true },
      'defineHiddenLazyStatic': { enumerable: false, future: true, static: true },
    },
  },
}

for (var name in definitions) {

  var { 
    configurations,
    defaults,
    pluralName,
    pack,
  } = definitions[name];

  for (var prefix in configurations) {
    var configuration = configurations[prefix];

    // (define|set)[Const][Hidden](Field|Accessor|Function)(target, name, descriptor);
    var define = exports[prefix + name] = function() {

      // pack the arguments
      let { target, name, descriptor } = pack(...arguments);

      // assign defaults
      descriptor = { ...defaults, ...configuration, ...descriptor };

      // initialize descriptor (add stubs, special sauce, etc)
      initialize.call(descriptor, name, target);

      // define property
      return Object.defineProperty(target, name, descriptor);
    }

    // (define|set)[Const][Hidden](Properties|Accessors|Functions)(target, descriptors)
    exports[prefix + pluralName] = function(target, values) {

      // strings
      for (var name in values)
        define(target, name, values[name]);
    
      // symbols
      for (var symbol of Object.getOwnPropertySymbols(values))
        define(target, symbol, values[symbol]);
    
      return target;
    }
  }
}