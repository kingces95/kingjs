'use strict';

var assert = require('@kingjs/assert');
var is = require('@kingjs/is');
//var stringEx = require('@kingjs/string-ex');

var initProperty = require('./js/init/property');
var initField = require('./js/init/field');
var initFunction = require('./js/init/function');
var initAccessor = require('./js/init/accessors');
var initReference = require('./js/init/reference');
var initThunk = require('./js/init/thunk');
var initStubs = require('./js/init/stubs');
var initLambda = require('./js/init/lambda');
var initReference = require('./js/init/reference');

var definitions = {

  'Field': {
    pluralName: 'Fields',
    initializer: initField,
    defaults: { 
      configurable: false, 
      writable: true 
    },
    configurations: {
      'set': { configurable: true, enumerable: true },
      'setHidden': { configurable: true, enumerable: false },
      'setConst': { configurable: true, enumerable: true, writable: false },
      'setHiddenConst': { configurable: true, enumerable: false, writable: false },

      'define': { enumerable: true },
      'defineHidden': { enumerable: false },
      'defineConst': { enumerable: true, writable: false },
      'defineHiddenConst': { enumerable: false, writable: false },

      'defineStatic': { enumerable: true, static: true },
      'defineHiddenStatic': { enumerable: false, static: true },
      'defineConstStatic': { enumerable: true, writable: false, static: true },
      'defineHiddenConstStatic': { enumerable: false, writable: false, static: true },
    },
  },

  'Property': {
    pluralName: 'Properties',
    initializer: initProperty,
    defaults: { 
      configurable: false 
    },
    configurations: {
      'define': { enumerable: false, writable: false },
    }
  },

  'Reference': {
    pluralName: 'References',
    initializer: initReference,
    defaults: { 
      future: true, 
      set: true, 
      configurable: false 
    },
    configurations: {
      'set': { configurable: true, enumerable: true },
      'setHidden': { configurable: true, enumerable: false },

      'define': { enumerable: true },
      'defineHidden': { enumerable: false },

      'defineStatic': { enumerable: true, static: true },
      'defineHiddenStatic': { enumerable: false, static: true },
    },
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

      'defineStatic': { static: true },
      'defineStaticLazy': { static: true, future: true },
    },
  },

  'Accessor': {
    pluralName: 'Accessors',
    initializer: initAccessor,
    defaults: { 
      configurable: false 
    },
    configurations: {
      'set': { configurable: true, enumerable: true },
      'setHidden': { configurable: true, enumerable: false },

      'define': { enumerable: true },
      'defineHidden': { enumerable: false },

      'defineLazy': { enumerable: true, future: true },
      'defineHiddenLazy': { enumerable: false, future: true },

      'defineStatic': { enumerable: true, static: true },
      'defineHiddenStatic': { enumerable: false, static: true },

      'defineStaticLazy': { enumerable: true, static: true, future: true },
      'defineHiddenStaticLazy': { enumerable: false, static: true, future: true },
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

    var isFunction = descriptor.function;
    var isAccessor = 'get' in descriptor || 'set' in descriptor;
    var isReference = descriptor.reference;

    // lambda + stubs
    if (isFunction || isAccessor || isReference) {
      if (!is.stringOrSymbol(name))
        name = (descriptor.value || descriptor.get || descriptor.set).name;

      descriptor = initLambda.call(descriptor);    
      descriptor = initStubs.call(descriptor, target, name);
    }
    else if (isReference) {
      descriptor = initReference.call(descriptor, target, name);
    }

    // augment name
    if (target.prefix)
      name = target.prefix + stringEx.capitalize(name);
    if (target.suffix)
      name += target.suffix;

    var result = Object.defineProperty(target, name, descriptor);

    // make property on ctor available to instances via thunks on prototype
    if (descriptor.static) {
      descriptor = initThunk.call(descriptor, target, name);

      assert(is.function(target));
      Object.defineProperty(target.prototype, name, descriptor);
    }

    return result;
  };

  // (define|set)[Const][Hidden](Properties|Accessors|Functions)(target, descriptors)
  exports[prefix + pluralSuffix] =
    function (target, values) {
      for (var name in values)
        define(target, name, values[name]);

      var symbols = Object.getOwnPropertySymbols(values);
      if (symbols.length > 0) {
        for (var i = 0; i < symbols.length; i ++)
          define(target, symbols[i], values[symbols[i]]);
      }
    };
}

var ConstPropertyConfiguration = {
  configurable: false,
  enumerable: false,
  writable: false
}

for (var name in exports)
  Object.defineProperty(exports, name, ConstPropertyConfiguration);
