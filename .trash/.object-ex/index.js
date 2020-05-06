var {
  '@kingjs': {
    getOwnPropertyKeys,
    propertyDescriptor: {
      constructProperty, 
      constructAccessor, 
      constructField,
      define
    }
  }
} = module[require('@kingjs-module/dependencies')]();

var definitions = {

  'Field': {
    pluralName: 'Fields',
    construct: constructField,
    configurations: {
      'set': { configurable: true, enumerable: true, writable: true },
      'setHidden': { configurable: true, writable: true },
      'setConst': { configurable: true, enumerable: true },
      'setHiddenConst': { configurable: true },

      'define': { enumerable: true, writable: true },
      'defineHidden': { writable: true },
      'defineConst': { enumerable: true },
      'defineHiddenConst': { },
    },
  },

  'Property': {
    pluralName: 'Properties',
    construct: constructProperty,
    configurations: {
      'define': { },
    }
  },

  'Function': {
    pluralName: 'Functions',
    construct: constructProperty,
    configurations: {
      'define': { function: true },
      'defineLazy': { function: true, lazy: true },
      'defineLazyStatic': { function: true, lazy: true, static: true },
    },
  },

  'Accessor': {
    pluralName: 'Accessors',
    construct: constructAccessor,
    configurations: {
      'set': { configurable: true, enumerable: true },
      'setHidden': { configurable: true },

      'setLazy': { configurable: true, enumerable: true, lazy: true },
      'setHiddenLazy': { configurable: true, lazy: true, static: true },
      'setLazyStatic': { configurable: true, enumerable: true, lazy: true },
      'setHiddenLazyStatic': { configurable: true, lazy: true, static: true },

      'define': { enumerable: true },
      'defineHidden': { },

      'defineLazy': {  enumerable: true, lazy: true },
      'defineHiddenLazy': { lazy: true },
      'defineLazyStatic': {  enumerable: true, lazy: true, static: true },
      'defineHiddenLazyStatic': { lazy: true, static: true },
    },
  },
}

function exportConfiguration(definition, configuration, prefix) {
  var { 
    pluralName,
    construct,
  } = definition;

  var singularName = prefix + name;
  var pluralName = prefix + pluralName;

  exports[singularName] = function() {

    // construct the arguments
    let { target, name, descriptor } = construct(...arguments);

    // assign defaults
    descriptor = { ...configuration, ...descriptor };

    // define descriptor + lambdize, callback, extends, lazy
    return define(target, name, descriptor);
  }

  exports[pluralName] = function(target, values) {
    for (var key of Reflect.ownKeys(values))
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