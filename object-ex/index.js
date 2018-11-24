'use strict';

var assert = require('@kingjs/assert');
var is = require('@kingjs/is');

var initMethod = require('./js/init-method');
var initAccessors = require('./js/init-accessors');
var initField = require('./js/init-field');
var getName = require('./js/get-name');
var makeLazy = require('./js/make-lazy');

var shift = Array.prototype.shift;

var OnTargetsSuffix = 'OnTargets';

var ConstPropertyConfiguration = {
  configurable: false,
  enumerable: false,
  writable: false
}

var definitions = {

  'Field': {
    pluralName: 'Fields',
    initializer: initField,
    configurations: {
      'set': { configurable: true, enumerable: true, writable: true },
      'setHidden': { configurable: true, enumerable: false, writable: true },
      'define': { configurable: false, enumerable: true, writable: true },
      'defineHidden': { configurable: false, enumerable: false, writable: true },
      'setConst': { configurable: true, enumerable: true, writable: false },
      'setHiddenConst': { configurable: true, enumerable: false, writable: false },
      'defineConst': { configurable: false, enumerable: true, writable: false },
      'defineHiddenConst': { configurable: false, enumerable: false, writable: false },
    },
  },

  'Method': {
    pluralName: 'Methods',
    initializer: initMethod,
    configurations: {
      'define': { configurable: false, enumerable: false, writable: false },
    },
    complications: {
      'Lazy': { lazy: true }
    },
  },

  'Accessor': {
    pluralName: 'Accessors',
    initializer: initAccessors,
    configurations: {
      'set': { configurable: true, enumerable: true },
      'setHidden': { configurable: true, enumerable: false },
      'define': { configurable: false, enumerable: true },
      'defineHidden': { configurable: false, enumerable: false },
    },
    complications: {
      'Lazy': { lazy: true }
    },
  },
}

function exportDefinition(
  prefix,
  suffix,
  pluralSuffix,
  configuration,
  initializer,
  complication) {

  assert('configurable' in configuration);
  assert('enumerable' in configuration);

  // (define|set)[Const][Hidden](Field|Accessor|Method)(target, name, descriptor);
  var define = exports[prefix + suffix] = function () {

    var descriptor = { };

    // initialize with configuration
    for (var key in configuration)
      descriptor[key] = configuration[key];

    var target = shift.call(arguments);

    // add method, accessors, or field 
    descriptor = initializer.apply(descriptor, arguments);

    // discover name
    var name = shift.call(arguments);
    if (!is.stringOrSymbol(name))
      name = getName.call(descriptor);

    // make lazy
    if (complication.lazy)
      descriptor = makeLazy.call(descriptor, name);

    if (target)
      Object.defineProperty(target, name, descriptor);

    return descriptor;
  };

  // (define|set)[Const][Hidden](Field|Accessor|Method)OnTargets(targets, name, descriptor)
  exports[prefix + suffix + OnTargetsSuffix] =
    function (targets, fieldOrAccessorName, descriptors, setter) {
      for (var i = 0; i < targets.length; i++)
        define(targets[i], fieldOrAccessorName, descriptors, setter);
    };

  // (define|set)[Const][Hidden](Properties|Accessors|Methods)(target, descriptors)
  var defineMany = exports[prefix + pluralSuffix] =
    function (target, values) {
      for (var name in values)
        define(target, name, values[name]);

      var symbols = Object.getOwnPropertySymbols(values);
      if (symbols.length > 0) {
        for (var i = 0; i < symbols.length; i ++)
          define(target, symbols[i], values[symbols[i]]);
      }
    };

  // (define|set)[Const][Hidden](Properties|Accessors|Method)OnTargets(targets, descriptor)
  exports[prefix + pluralSuffix + OnTargetsSuffix] =
    function (targets, descriptors) {
      for (var i = 0; i < targets.length; i++)
        defineMany(targets[i], descriptors);
    }
}

for (var suffix in definitions) {
  var definition = definitions[suffix];
  var pluralSuffix = definition.pluralName;
  var initializer = definition.initializer || (() => new Object());
  var complications = definition.complications || {};
  var configurations = definition.configurations;

  for (var prefix in configurations) {
    var configuration = configurations[prefix];

    complications[''] = {}
    for (var complication in complications) {

      exportDefinition(
        prefix + complication,
        suffix,
        pluralSuffix,
        configuration,
        initializer,
        complications[complication],
      )
    }
  }
}

exports.defineProperty = require('./js/define-property');
exports.defineReference = require('./js/define-reference');

for (var name in exports)
  Object.defineProperty(exports, name, ConstPropertyConfiguration);
