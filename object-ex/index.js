'use strict';

var assert = require('@kingjs/assert');
var createFunctionDescriptor = require('./js/create-function-descriptor');
var createAccessorDescriptor = require('./js/create-accessor-descriptor');
var createFieldDescriptor = require('./js/create-field-descriptor');
var createSetOnceDescriptor = require('./js/create-set-once-descriptor');
var createReferenceDescriptor = require('./js/create-reference-descriptor');

var standardConfigurations = { 
  'set':                { configurable: true,   enumerable: true },
  'setHidden':          { configurable: true,   enumerable: false },
  'define':             { configurable: false,  enumerable: true },
  'defineHidden':       { configurable: false,  enumerable: false },
};

var definitions = {

  'Field': {
    pluralName: 'Fields',
    configurations: { 
      'set':                { configurable: true,   enumerable: true,   writable: true },
      'setHidden':          { configurable: true,   enumerable: false,  writable: true },
      'define':             { configurable: false,  enumerable: true,   writable: true },
      'defineHidden':       { configurable: false,  enumerable: false,  writable: true },
      'setConst':           { configurable: true,   enumerable: true,   writable: false },
      'setHiddenConst':     { configurable: true,   enumerable: false,  writable: false },
      'defineConst':        { configurable: false,  enumerable: true,   writable: false },
      'defineHiddenConst':  { configurable: false,  enumerable: false,  writable: false },
    },
    normalizer: createFieldDescriptor
  },

  'Function': {
    pluralName: 'Functions',
    configurations: {
      'define': { configurable: false, enumerable: false, writable: false },
    },
    complications: {
      'Lazy': { lazy: true } 
    },
    normalizer: createFunctionDescriptor,
  },

  'Accessor': {
    pluralName: 'Accessors',
    configurations: standardConfigurations,
    complications: {
      'Lazy': { lazy: true } 
    },
    normalizer: createAccessorDescriptor,
  },

  'SetOnceField': {
    pluralName: 'SetOnceFields',
    configurations: standardConfigurations,
    normalizer: createSetOnceDescriptor, 
  },

  'Reference': {
    pluralName: 'References',
    configurations: standardConfigurations,
    normalizer: createReferenceDescriptor
  },
}

var OnTargetsSuffix = 'OnTargets';

function exportDefinition(
  prefix,
  suffix,
  pluralSuffix,
  configuration,
  normalizer,
  complication) {

  assert('configurable' in configuration);
  assert('enumerable' in configuration);
  
  // (define|set)[Const][Hidden](Field|Accessor|Function)(target, name, descriptor);
  var define = exports[prefix + suffix] = function() {

    // initialize descriptor
    var descriptor = { };
    for (var name in configuration)
      descriptor[name] = configuration[name];
    for (var name in complication)
      descriptor[name] = complication[name];

    // replace target with descriptor
    var target = arguments[0];
    arguments[0] = descriptor;

    // normalize 
    descriptor = normalizer.apply(this, arguments);

    Object.defineProperty(target, descriptor.name, descriptor);
  };

  // (define|set)[Const][Hidden](Field|Accessor|Function)OnTargets(targets, name, descriptor)
  exports[prefix + suffix + OnTargetsSuffix] =  
    function(targets, fieldOrAccessorName, descriptors, setter) {
      for (var i = 0; i < targets.length; i++)       
        define(targets[i], fieldOrAccessorName, descriptors, setter); 
    };

  // (define|set)[Const][Hidden](Properties|Accessors|Functions)(target, descriptors)
  var defineMany = exports[prefix + pluralSuffix] =
    function(target, values) {
      for (var name in values)
        define(target, name, values[name]);
    };

  // (define|set)[Const][Hidden](Properties|Accessors|Function)OnTargets(targets, descriptor)
  exports[prefix + pluralSuffix + OnTargetsSuffix] =
    function(targets, descriptors) {
      for (var i = 0; i < targets.length; i++)
        defineMany(targets[i], descriptors); 
    }
}

for (var suffix in definitions) {
  var definition = definitions[suffix];
  var pluralSuffix = definition.pluralName;
  var normalizer = definition.normalizer || (() => new Object());
  var complications = definition.complications || { };
  var configurations = definition.configurations;

  for (var prefix in configurations) {
    var configuration = configurations[prefix]; 
    
    complications[''] = { }
    for (var complication in complications) {

      exportDefinition(
        prefix + complication,
        suffix, 
        pluralSuffix,
        configuration,
        normalizer,
        complications[complication],
      )
    }
  }
}

var ConstPropertyConfiguration = { 
  configurable: false,
  enumerable: false,
  writable: false
}

for (var name in exports)
  Object.defineProperty(exports, name, ConstPropertyConfiguration);
