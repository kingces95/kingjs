var {
  ['@kingjs']: {
    getOwnPropertyKeys,
    propertyDescriptor: {
      constructProperty, 
      constructAccessor, 
      constructField,
      define
    }
  }
} = dependencies('./dependencies');

var definitions = {

  'Field': {
    pluralName: 'Fields',
    construct: constructField,
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
    construct: constructProperty,
    defaults: { 
      configurable: false 
    },
    configurations: {
      'define': { enumerable: false },
    }
  },

  'Function': {
    pluralName: 'Functions',
    construct: constructProperty,
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
    construct: constructAccessor,
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
    construct,
  } = definitions[name];

  for (var prefix in configurations) {
    var configuration = configurations[prefix];

    // (define|set)[Const][Hidden](Field|Accessor|Function)(target, name, descriptor);
    var define = exports[prefix + name] = function() {

      // construct the arguments
      let { target, name, descriptor } = construct(...arguments);

      // assign defaults
      descriptor = { ...defaults, ...configuration, ...descriptor };

      // define descriptor + lambdize, callback, extends, lazy
      return define(target, name, descriptor);
    }

    // (define|set)[Const][Hidden](Properties|Accessors|Functions)(target, descriptors[, map])
    exports[prefix + pluralName] = function(target, values, map) {

      for (var key in getOwnPropertyKeys.call(values)) {
        if (map) 
          key = map(key);

        var { descriptor } = construct(target, name, values[key]);

        define(target, name, descriptor);
      }
    
      return target;
    }
  }
}