'use strict';
var defineDefine = require('./define');
var forEach = require('./for-each');

var normalizeProperty = require('@kingjs/define.normalize-property');
var normalizeField = require('@kingjs/define.normalize-field');
var normalizeFunction = require('@kingjs/define.normalize-function');
var normalizeAccessor = require('@kingjs/define.normalize-accessor');

var definitions = {

  'Field': {
    pluralName: 'Fields',
    normalizer: normalizeField,
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
    normalizer: normalizeProperty,
    defaults: { 
      configurable: false 
    },
    configurations: {
      'define': { enumerable: false },
    }
  },

  'Function': {
    pluralName: 'Functions',
    normalizer: normalizeFunction,
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
    normalizer: normalizeAccessor,
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
    normalizer,
  } = definitions[name];

  for (var prefix in configurations) {
    var configuration = configurations[prefix];

    // (define|set)[Const][Hidden](Field|Accessor|Function)(target, name, descriptor);
    var { [prefix + name]: define } = defineDefine(exports, prefix + name, {
      normalizer, defaults: { ...defaults, ...configuration }, 
    }); 

    // (define|set)[Const][Hidden](Properties|Accessors|Functions)(target, descriptors)
    exports[prefix + pluralName] = forEach.bind(define);
  }
}