'use strict';

var assert = require('@kingjs/assert');
var is = require('@kingjs/is');

var initProperty = require('./js/init/property');
var initField = require('./js/init/field');
var initFunction = require('./js/init/function');
var initAccessor = require('./js/init/accessors');
var initReference = require('./js/init/reference');

var defineField = require('./js/define/field');
var defineFunction = require('./js/define/function');
var defineAccessor = require('./js/define/accessors');
var defineReference = require('./js/define/reference');

var getName = require('./js/get-name');

var shift = Array.prototype.shift;

var ConstPropertyConfiguration = {
  configurable: false,
  enumerable: false,
  writable: false
}

var definitions = {

  'Field': {
    pluralName: 'Fields',
    normalizer: initField,
    defineProperty: defineField,
    configurations: {
      'set': { configurable: true, enumerable: true, writable: true },
      'setHidden': { configurable: true, enumerable: false, writable: true },
      'setConst': { configurable: true, enumerable: true, writable: false },
      'setHiddenConst': { configurable: true, enumerable: false, writable: false },

      'define': { configurable: false, enumerable: true, writable: true },
      'defineHidden': { configurable: false, enumerable: false, writable: true },
      'defineConst': { configurable: false, enumerable: true, writable: false },
      'defineHiddenConst': { configurable: false, enumerable: false, writable: false },

      'defineStatic': { configurable: false, enumerable: true, writable: true, static: true },
      'defineHiddenStatic': { configurable: false, enumerable: false, writable: true, static: true },
      'defineConstStatic': { configurable: false, enumerable: true, writable: false, static: true },
      'defineHiddenConstStatic': { configurable: false, enumerable: false, writable: false, static: true },
    },
  },

  'Property': {
    pluralName: 'Properties',
    normalizer: initProperty,
    defineProperty: defineField,
    configurations: {
      'define': { configurable: false, enumerable: false, writable: false },
    }
  },

  'Reference': {
    pluralName: 'References',
    normalizer: initReference,
    defineProperty: defineReference,
    configurations: {
      'set': { configurable: true, enumerable: true },
      'setHidden': { configurable: true, enumerable: false },

      'define': { configurable: false, enumerable: true },
      'defineHidden': { configurable: false, enumerable: false },

      'defineStatic': { configurable: false, enumerable: true, static: true },
      'defineHiddenStatic': { configurable: false, enumerable: false, static: true },
    },
  },

  'Function': {
    pluralName: 'Functions',
    normalizer: initFunction,
    defineProperty: defineFunction,
    configurations: {
      'define': { configurable: false, enumerable: false, writable: false },
      'defineStatic': { configurable: false, enumerable: false, writable: false, static: true },
    },
    complications: {
      'Lazy': { lazy: true },
    },
  },

  'Accessor': {
    pluralName: 'Accessors',
    normalizer: initAccessor,
    defineProperty: defineAccessor,
    configurations: {
      'set': { configurable: true, enumerable: true },
      'setHidden': { configurable: true, enumerable: false },

      'define': { configurable: false, enumerable: true },
      'defineHidden': { configurable: false, enumerable: false },

      'defineStatic': { configurable: false, enumerable: true, static: true },
      'defineHiddenStatic': { configurable: false, enumerable: false, static: true },
    },
    complications: {
      'Lazy': { lazy: true },
    },
  },
}

function exportDefinition(
  prefix,
  suffix,
  pluralSuffix,
  configuration,
  normalizer,
  defineProperty,
  complication) {

  assert('configurable' in configuration);
  assert('enumerable' in configuration);

  // (define|set)[Const][Hidden](Field|Accessor|Function)(target, name, descriptor);
  var define = exports[prefix + suffix] = function () {

    var descriptor = { };

    // initialize with configuration
    for (var key in configuration)
      descriptor[key] = configuration[key];

    var target = shift.call(arguments);

    // normalize signature if other than (target, name, descriptor)
    if (normalizer)
      descriptor = normalizer.apply(descriptor, arguments);

    // discover name
    var name = shift.call(arguments);
    if (!is.stringOrSymbol(name))
      name = getName.call(descriptor);

    // make lazy
    if (complication.lazy)
      descriptor.lazy = true;

    return defineProperty(target, name, descriptor);
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

for (var suffix in definitions) {
  var definition = definitions[suffix];
  var pluralSuffix = definition.pluralName;
  var normalizer = definition.normalizer;
  var defineProperty = definition.defineProperty;
  var complications = definition.complications || {};
  var configurations = definition.configurations;

  for (var prefix in configurations) {
    var configuration = configurations[prefix];

    complications[''] = {}
    for (var complication in complications) {

      assert(defineProperty);

      exportDefinition(
        prefix + complication,
        suffix,
        pluralSuffix,
        configuration,
        normalizer,
        defineProperty,
        complications[complication],
      )
    }
  }
}

exports.defineProperty = defineField;

for (var name in exports)
  Object.defineProperty(exports, name, ConstPropertyConfiguration);
