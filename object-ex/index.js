'use strict';

var transform = require('@kingjs/descriptor.family.transform');
var assert = require('@kingjs/assert');

var OnTargetsSuffix = 'OnTargets';

var ConstPropertyAttributes = { 
  configurable: false,
  enumerable: false,
  writable: false
}

function pluralOf(x) {
  return x + 's';
}

function isString(o) { 
  return typeof o == 'string'; 
}

function isFunction(x) { 
  return typeof x == 'function'; 
}

function isObjectLiteral(x) {
  return typeof x == 'object' && x != null && x.constructor == Object;
}

function isNamedFunction(x) { 
  return isFunction(x) && isNonEmptyString(x.name);
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
  assert(isFunction(func));
  assert(isFunction(proxy));
  
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

function normalizeDefineFunction(next, target, name, descriptor) {
      
  // e.g. function foo() { ... } => 'foo', function foo() { ... }
  if (isNamedFunction(name)) {
    descriptor = name;
    name = descriptor.name;
  }
  
  // e.g. 'foo', function() { ... } => 'foo', { value: function() { ... } }
  if (isFunction(descriptor))
    descriptor = { value: descriptor };
  
  return next.call(this, target, name, descriptor);
}

function normalizeDefineProperty(next, target, name, value) {
      
  // e.g. foo => { value: foo }
  return next.call(this, target, name, { value: value });
}

function normalizeDefineAccessor(next, target, name, descriptor) {
      
  // e.g. { get: function foo() { ... } } => 'foo', { get: function foo() { ... } }
  if (isObjectLiteral(name)) {
    descriptor = name;
    name = findValue(descriptor, isNamedFunction).name;
  }
  
  else if (!isObjectLiteral(descriptor)) {
    var get, set;
    
    // e.g. function foo() { ... } => 'foo', { get: function foo() { ... } }
    if (isFunction(name) || name == undefined) {
      get = name;
      set = descriptor;
      name = (get || set).name;
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
  
  Assert.that(isString(name));
  Assert.that(descriptor.get || descriptor.set);
  Assert.that(!descriptor.get || isFunction(descriptor.get));
  Assert.that(!descriptor.set || isFunction(descriptor.set));
  
  return next.call(this, target, name, descriptor);        
}

function bindDefineConfiguredProperty(configuration, proxy) {

  // close over configuration
  var define = function(target, name, descriptor) {
    return Object.defineProperty(
      target, 
      name, 
      assign(descriptor, configuration)
    );
  }

  // add normalizing proxy
  return bindProxy(define, proxy);
}

function exportDefineConfiguredPropertyFamily(name, define) {
  
  // (define|set)[Const][Hidden](Property|Accessor)(target, name, descriptor);
  exportConstProperty(name, define);
  
  // (define|set)[Const][Hidden](Property|Accessor)OnTargets(targets, name, descriptor)
  exportConstProperty(
    name + OnTargetsSuffix, 
    function(targets, propertyOrAccessorName, descriptors, setter) {
      for (var i = 0; i < targets.length; i++)       
        define(target[i], propertyOrAccessorName, descriptors, setter); 
    }
  );
  
  // (define|set)[Const][Hidden](Properties|Accessors)(target, descriptors)
  var pluralName = pluralOf(name);
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
        defineMany(target[i], descriptors); 
    }
  );
}

function exportConstProperty(name, value) {
  exports[name] = value;
  Object.defineProperty(exports, name, ConstPropertyAttributes);
  return value;
}

transform.call({

  'Function': {
    namedConfigurations: {
      define:             { configurable: false, enumerable: false, writable: false }
    }, 
    proxy: normalizeDefineFunction
  },
  
  'Property': {
    namedConfigurations: { 
      set:                { configurable: true, enumerable: true, writable: true },
      setConst:           { configurable: true, enumerable: true, writable: false },
      setHidden:          { configurable: true, enumerable: false, writable: true },
      setConstHidden:     { configurable: true, enumerable: false, writable: false },
      define:             { configurable: false, enumerable: true, writable: true },
      defineConst:        { configurable: false, enumerable: true, writable: false },
      defineHidden:       { configurable: false, enumerable: false, writable: true },
      defineConstHidden:  { configurable: false, enumerable: true, writable: false }
    }, 
    proxy: normalizeDefineProperty
  },
  
  'Accessor': {
    namedConfigurations: { 
      set:                { configurable: true, enumerable: true },
      setHidden:          { configurable: true, enumerable: false },
      define:             { configurable: false, enumerable: true },
      defineHidden:       { configurable: false, enumerable: false },
    },
    proxy: normalizeDefineAccessor
  }

}, function(descriptor, suffix) {

  transform.call(
    descriptor.namedConfigurations,
    function(configuration, prefix) {
      var name = prefix + suffix;
      var define = bindDefineConfiguredProperty(configuration, descriptor.proxy);
      exportDefineConfiguredPropertyFamily(name, define);
    }
  );      
});

var debug = exports;
return;