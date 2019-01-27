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
} = require('./dependencies');

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
      'defineLazy': { lazy: true },
      'defineLazyStatic': { lazy: true, static: true },
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

      'setLazy': { configurable: true, lazy: true },
      'setHiddenLazy': { configurable: true, enumerable: false, lazy: true, static: true },
      'setLazyStatic': { configurable: true, lazy: true },
      'setHiddenLazyStatic': { configurable: true, enumerable: false, lazy: true, static: true },

      'define': { },
      'defineHidden': { enumerable: false },

      'defineLazy': { lazy: true },
      'defineHiddenLazy': { enumerable: false, lazy: true },
      'defineLazyStatic': { lazy: true, static: true },
      'defineHiddenLazyStatic': { enumerable: false, lazy: true, static: true },
    },
  },
}

function exportConfiguration(definition, configuration, prefix) {
  var { 
    defaults,
    pluralName,
    construct,
  } = definition;

  var singularName = prefix + name;
  var pluralName = prefix + pluralName;

  exports[singularName] = function() {

    // construct the arguments
    let { target, name, descriptor } = construct(...arguments);

    // assign defaults
    descriptor = { ...defaults, ...configuration, ...descriptor };

    // define descriptor + lambdize, callback, extends, lazy
    return define(target, name, descriptor);
  }

  exports[pluralName] = function(target, values) {
    for (var key of getOwnPropertyKeys.call(values))
      exports[singularName](target, key, values[key]);
    return target;
  }
}

for (var name in definitions) {
  var definition = definitions[name];
  var configurations = definition.configurations;

  for (var prefix in configurations) {
    var configuration = configurations[prefix];
    exportConfiguration(definition, configuration, prefix)
  }
}