'use strict';

var is = require('@kingjs/is');
var transform = require('@kingjs/descriptor.family.transform');
var assert = require('@kingjs/assert');

var OnTargetsSuffix = 'OnTargets';

var ConstPropertyAttributes = { 
  configurable: false,
  enumerable: false,
  writable: false
}

function assign(target, source) {
  for (var name in source) {
    if (name in target)
      continue;

    target[name] = source[name];
  }

  return target;
}

function bindArg(func, index, value) {
  assert(func);
  
  return function() { 
    Array.prototype.splice.call(arguments, index, 0, value);
    return func.apply(this, arguments); 
  };
}

function bind1st(func, value) {
  return bindArg(func, 0, value);
}

function bindProxy(func, proxy) {
  assert(is.function(func));
  assert(is.function(proxy));
  
  return function() { 
    Array.prototype.unshift.call(arguments, func);
    return proxy.apply(this, arguments); 
  };
}

function findValue(source, predicate) {
  for (var name in source) {
    var value = source[name];
    if (predicate(value))
      return value;
  }
}

function createFunctionDescriptor(next, target, name, descriptor) {
      
  // e.g. function foo() { ... } => 'foo', function foo() { ... }
  if (is.namedFunction(name)) {
    descriptor = name;
    name = descriptor.name;
  }
  
  // e.g. 'foo', function() { ... } => 'foo', { value: function() { ... } }
  if (is.function(descriptor))
    descriptor = { value: descriptor };
  
  return next.call(this, target, name, descriptor);
}

function createAccessorDescriptor(next, target, name, descriptor) {
      
  // e.g. { get: function foo() { ... } } => 'foo', { get: function foo() { ... } }
  if (is.objectLiteral(name)) {
    descriptor = name;
    name = findValue(descriptor, is.namedFunction).name;
  }
  
  else if (!is.objectLiteral(descriptor)) {
    var get, set;
    
    // e.g. function foo() { ... } => 'foo', { get: function foo() { ... } }
    if (is.function(name)) {
      get = name;
      set = descriptor;
      name = get.name;
    } 
    
    // e.g. 'foo', function() { ... } => 'foo', { get: function() { ... } }
    else {
      get = descriptor;
      set = arguments[4];
    }
    
    descriptor = { };
    if (get) descriptor.get = get;
    if (set) descriptor.set = set;
  }
  
  assert(is.string(name));
  assert(descriptor.get || descriptor.set);
  assert(!descriptor.get || is.function(descriptor.get));
  assert(!descriptor.set || is.function(descriptor.set));
  
  return next.call(this, target, name, descriptor);        
}

function bindDefineConfiguredValue(configuration) {

  // close over configuration
  var define = function(target, name, value) {

    var descriptor = null;

    // optimized case: set property not previously defined 
    if (name in target == false) {
      target[name] = value;
      descriptor = configuration;
    } 

    // general case: e.g. override inherited readonly property
    else {
      descriptor = assign({ value: value }, configuration);
    }

    return Object.defineProperty(
      target, 
      name, 
      descriptor
    );
  }

  return define;
}

function bindDefineConfiguredProperty(configuration, proxy) {
  return bindProxy(function(target, name, descriptor) {
    return Object.defineProperty(
      target, 
      name, 
      // close over configuration
      assign(descriptor, configuration)
    );
  }, proxy);
}

function exportDefineConfiguredPropertyFamily(name, pluralName, define) {
  
  // (define|set)[Const][Hidden](Property|Accessor)(target, name, descriptor);
  exportConstProperty(name, define);
  
  // (define|set)[Const][Hidden](Property|Accessor)OnTargets(targets, name, descriptor)
  exportConstProperty(
    name + OnTargetsSuffix, 
    function(targets, propertyOrAccessorName, descriptors, setter) {
      for (var i = 0; i < targets.length; i++)       
        define(targets[i], propertyOrAccessorName, descriptors, setter); 
    }
  );
  
  // (define|set)[Const][Hidden](Properties|Accessors)(target, descriptors)
  var defineMany = exportConstProperty(
    pluralName, 
    function(target, descriptors) {
      return transform.call(descriptors, bind1st(define, target));
    }
  );
  
  // (define|set)[Const][Hidden](Properties|Accessors)OnTargets(targets, descriptor)
  exportConstProperty(
    pluralName + OnTargetsSuffix, 
    function(targets, descriptors) {
      for (var i = 0; i < targets.length; i++)
        defineMany(targets[i], descriptors); 
    }
  );
}

function exportConstProperty(name, value) {
  exports[name] = value;
  Object.defineProperty(exports, name, ConstPropertyAttributes);
  return value;
}

transform.call({
  
  'Property': {
    pluralName: 'Properties',
    namedConfigurations: { 
      set:                { configurable: true, enumerable: true, writable: true },
      setConst:           { configurable: true, enumerable: true, writable: false },
      setHidden:          { configurable: true, enumerable: false, writable: true },
      setHiddenConst:     { configurable: true, enumerable: false, writable: false },
      define:             { configurable: false, enumerable: true, writable: true },
      defineConst:        { configurable: false, enumerable: true, writable: false },
      defineHidden:       { configurable: false, enumerable: false, writable: true },
      defineHiddenConst:  { configurable: false, enumerable: false, writable: false }
    }, 
  },

  'Function': {
    pluralName: 'Functions',
    namedConfigurations: {
      define:             { configurable: false, enumerable: false, writable: false }
    }, 
    proxy: createFunctionDescriptor
  },

  'Accessor': {
    pluralName: 'Accessors',
    namedConfigurations: { 
      set:                { configurable: true, enumerable: true },
      setHidden:          { configurable: true, enumerable: false },
      define:             { configurable: false, enumerable: true },
      defineHidden:       { configurable: false, enumerable: false },
    },
    proxy: createAccessorDescriptor
  }

}, function(suffix, descriptor) {

  var pluralSuffix = descriptor.pluralName;
  var proxy = descriptor.proxy;

  transform.call(
    descriptor.namedConfigurations,
    function(prefix, configuration) {

      var define = proxy ?
        bindDefineConfiguredProperty(configuration, proxy) :
        bindDefineConfiguredValue(configuration);

      exportDefineConfiguredPropertyFamily(
        prefix + suffix, 
        prefix + pluralSuffix,
        define
      );
    }
  );      
});
