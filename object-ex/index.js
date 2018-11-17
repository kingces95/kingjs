'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

function createPropertyDescriptor(descriptor, name, value) {
  descriptor.name = name;
  descriptor.value = value;
  return descriptor;
}

function createFunctionDescriptor(descriptor, x, y) {
      
  // e.g. function foo() { ... } => 'foo', function foo() { ... }
  if (is.namedFunction(x)) {
    descriptor.name = x.name;
    descriptor.value = x;
  }
  
  // e.g. 'foo', function() { ... } => 'foo', { value: function() { ... } }
  else if (is.function(y)) {
    descriptor.name = x;
    descriptor.value = y;
  }

  // e.g. 'foo', { value: function() { ... } }
  else {
    descriptor.name = x;
    for (var name in y)
      descriptor[name] = y[name];
  }
  
  return descriptor;
}

function findValue(source, predicate) {
  for (var name in source) {
    var value = source[name];
    if (predicate(value))
      return value;
  }
}

function createAccessorDescriptor(descriptor, x, y, z) {
      
  // e.g. { get: function foo() { ... } } => 'foo', { get: function foo() { ... } }
  if (is.objectLiteral(x)) {
    descriptor.name = findValue(x, is.namedFunction).name;
    for (var name in x)
      descriptor[name] = x[name];
  }
  
  else if (!is.objectLiteral(y)) {
    var get, set;
    
    // e.g. 'foo', function() { ... } => 'foo', { get: function() { ... } }
    if (is.string(x)) {
      descriptor.name = x;
      get = y;
      set = z;
    }

    // e.g. function foo() { ... } => 'foo', { get: function foo() { ... } }
    else {
      get = x;
      set = y;
      descriptor.name = get.name;
    } 

    if (get) descriptor.get = get;
    if (set) descriptor.set = set;
  }
 
  // e.g. 'foo', { get: function() { ... } }
  else {
    descriptor.name = x;
    for (var name in y)
      descriptor[name] = y[name];
  }

  assert(is.string(descriptor.name));
  assert(descriptor.get || descriptor.set);
  assert(!descriptor.get || is.function(descriptor.get));
  assert(!descriptor.set || is.function(descriptor.set));
  
  return descriptor;        
}

function createLazyAccessorDescriptor(descriptor, x, y, z) {
  descriptor = createAccessorDescriptor(descriptor, x, y, z);
  assert(descriptor.get);
  assert(!descriptor.set);

  var name = descriptor.name;
  var eagerGet = descriptor.get;

  descriptor.get = function() {
    var value = eagerGet.call(this);
    Object.defineProperty(this, name, {
      writable: false,
      configurable: false,
      enumerable: descriptor.enumerable,
      value: value
    });
    return value;
  }

  return descriptor;
}

function createReferenceDescriptor(descriptor, x, y, z) {
  descriptor = createAccessorDescriptor(descriptor, x, y, z);
  assert(descriptor.get);
  assert(!descriptor.set);

  var dereference = descriptor.get;
  delete descriptor.get;

  descriptor.set = function(address) {

    // replace set address with dereference address
    Object.defineProperty(this, {
      configurable: true,
      enumerable: descriptor.enumerable,
      get: function() {

        // resolve address to value!
        var value = dereference.call(this, address);
        if (value === undefined)
          return;

        // replace dereference address with value
        Object.defineProperty(this, name, {
          writable: false,
          configurable: false,
          enumerable: descriptor.enumerable,
          value: value
        });

        return value;
      }     
    })
  }
  
  return descriptor;        
}

function createLambdaDescriptor(descriptor, name, lambda) {
  return createReferenceDescriptor(descriptor, name, 
    new Function('return ' + lambda)
  );
}

var accessorConfigurations = { 
  set:                { configurable: true, enumerable: true },
  setHidden:          { configurable: true, enumerable: false },
  define:             { configurable: false, enumerable: true },
  defineHidden:       { configurable: false, enumerable: false },
};

var definitions = {
  
  'Property': {
    pluralName: 'Properties',
    configurations: { 
      set:                { configurable: true, enumerable: true, writable: true },
      setConst:           { configurable: true, enumerable: true, writable: false },
      setHidden:          { configurable: true, enumerable: false, writable: true },
      setHiddenConst:     { configurable: true, enumerable: false, writable: false },
      define:             { configurable: false, enumerable: true, writable: true },
      defineConst:        { configurable: false, enumerable: true, writable: false },
      defineHidden:       { configurable: false, enumerable: false, writable: true },
      defineHiddenConst:  { configurable: false, enumerable: false, writable: false }
    },
    normalizer: createPropertyDescriptor, 
  },

  'Function': {
    pluralName: 'Functions',
    configurations: {
      define:             { configurable: false, enumerable: false, writable: false }
    }, 
    normalizer: createFunctionDescriptor
  },

  'Accessor': {
    pluralName: 'Accessors',
    configurations: accessorConfigurations,
    normalizer: createAccessorDescriptor
  },

  'LazyAccessor': {
    pluralName: 'LazyAccessors',
    configurations: accessorConfigurations,
    normalizer: createLazyAccessorDescriptor
  },

  'Reference': {
    pluralName: 'References',
    configurations: accessorConfigurations,
    normalizer: createReferenceDescriptor
  },

  'Lambda': {
    pluralName: 'Lambdas',
    configurations: accessorConfigurations,
    normalizer: createLambdaDescriptor
  }
}

var OnTargetsSuffix = 'OnTargets';

function exportDefinition(
  suffix,
  prefix, 
  normalizer) {

  var definition = definitions[suffix]; 
  var pluralSuffix = definition.pluralName;
  var normalizer = definition.normalizer || (() => new Object());
  var configuration = definition.configurations[prefix];
  
  // (define|set)[Const][Hidden](Property|Accessor|Function)(target, name, descriptor);
  var define = exports[prefix + suffix] = function() {
    var target = arguments[0];

    var descriptor = { };
    for (var name in configuration)
      descriptor[name] = configuration[name];

    arguments[0] = descriptor;
    descriptor = normalizer.apply(this, arguments);

    var name = descriptor.name;
    delete descriptor.name;
    assert(is.string(name));

    Object.defineProperty(target, name, descriptor);
  };

  // (define|set)[Const][Hidden](Property|Accessor|Function)OnTargets(targets, name, descriptor)
  exports[prefix + suffix + OnTargetsSuffix] =  
    function(targets, propertyOrAccessorName, descriptors, setter) {
      for (var i = 0; i < targets.length; i++)       
        define(targets[i], propertyOrAccessorName, descriptors, setter); 
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
  for (var prefix in definitions[suffix].configurations)
    exportDefinition(suffix, prefix)
}

var ConstPropertyConfiguration = { 
  configurable: false,
  enumerable: false,
  writable: false
}

for (var name in exports)
  Object.defineProperty(exports, name, ConstPropertyConfiguration);