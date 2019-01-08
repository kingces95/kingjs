'use strict';
var assert = require('assert');

var is = require('@kingjs/is');

var initProperty = require('./js/property');
var initField = require('./js/field');
var initFunction = require('./js/function');
var initAccessor = require('./js/accessors');
var initThunk = require('./js/thunk');
var initExternal = require('./js/external');
var initExtension = require('./js/extension');
var initFuture = require('./js/future');
var initLambda = require('./js/lambda');

var definitions = {

  'Field': {
    pluralName: 'Fields',
    initializer: initField,
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
    initializer: initProperty,
    defaults: { 
      configurable: false 
    },
    configurations: {
      'define': { enumerable: false },
    }
  },

  'Function': {
    pluralName: 'Functions',
    initializer: initFunction,
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
    initializer: initAccessor,
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

for (var suffix in definitions) {
  var definition = definitions[suffix];
  var configurations = definition.configurations;

  for (var prefix in configurations) {
    var configuration = configurations[prefix];

    exportDefinition(
      prefix,
      suffix,
      definition.pluralName,
      definition.defaults,
      configuration,
      definition.initializer
    )
  }
}

function exportDefinition(
  prefix,
  suffix,
  pluralSuffix,
  defaults,
  configuration,
  initializer) {

  // (define|set)[Const][Hidden](Field|Accessor|Function)(target, name, descriptor);
  var defineName = prefix + suffix;
  var define = exports[defineName] = function(target, name) {

    var descriptor = { };

    for (var key in defaults)
      descriptor[key] = defaults[key];

    for (var key in configuration)
      descriptor[key] = configuration[key];

    descriptor = initializer.apply(descriptor, arguments);

    var hasGet = 'get' in descriptor;
    var hasSet = 'set' in descriptor;

    var isAccessor = hasGet || hasSet;
    var isFunction = descriptor.function;
    var isFuture = descriptor.future;
    var isThunk = descriptor.thunk;

    if (!is.stringOrSymbol(name))
      name = (descriptor.value || descriptor.get || descriptor.set).name;

    var map = descriptor.map;
    if (map) {
      assert(name in map);
      name = map[name];
    }

    var isProcedural = isAccessor || isFunction || isFuture || isThunk;
    if (isProcedural) {

      initLambda.call(descriptor, name);

      if (descriptor.thunk)
        initThunk.call(descriptor, descriptor.thunk);

      else {
        if (descriptor.extends)
          initExtension.call(descriptor, name);

        else if (descriptor.external)
          initExternal.call(descriptor, name, target);

        if (descriptor.future) 
          initFuture.call(descriptor, name);
      }
    }

    return Object.defineProperty(target, name, descriptor);
  };

  // (define|set)[Const][Hidden](Properties|Accessors|Functions)(target, descriptors)
  exports[prefix + pluralSuffix] =
    function (target, values, callerConfiguration) {

      // strings
      for (var name in values)
        define(target, name, values[name], callerConfiguration);

      // symbols
      for (var symbol of Object.getOwnPropertySymbols(values))
        define(target, symbol, values[symbol], callerConfiguration);

      return target;
    };
}

var ConstPropertyConfiguration = {
  configurable: false,
  enumerable: false,
  writable: false
}

for (var name in exports)
  Object.defineProperty(exports, name, ConstPropertyConfiguration);
