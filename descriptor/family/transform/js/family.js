'use strict';

var nested = {
  scorch: require('@kingjs/descriptor.nested.scorch'),
  update: require('@kingjs/descriptor.nested.update'),
}

var resolveAndSelect = require('./resolveAndSelect');
var wrapInheritDefaults = require('./wrapInheritDefaults');
var inflateThunkScorchUpdate = require('./inflateThunkScorchUpdate');

var depends = require('./depends');
var normalizeAction = require('./normalizeAction');
var createActions = require('./createActions');

function resolve(descriptors, name, action) {

  var descriptor = descriptors[name];

  // 9. Resolve
  if (action.refs) {
    descriptor = nested.update(
      descriptor,
      action.refs,
      resolveAndSelect,
      descriptors
    )
  }
  
  // 10. Freeze
  
  return descriptor;
}

function transform(action) {
  var result = { };
  
  // Pass I: 1-3; Wrap, Inherit, Defaults
  var actions = createActions(this, normalizeAction(action));
  var descriptors = actions.$descriptors || this;
  for (var name in actions) {
    var action = actions[name];
    var descriptor = descriptors[name] || descriptors[action.encodedName];
    result[name] = wrapInheritDefaults(descriptor, action);
  }

  // Pass II: 4; Depends
  depends(result, actions);

  // Pass III: 5-8; Inflate, Thunks, Scorch, Update
  for (var name in result)
    result[name] = inflateThunkScorchUpdate(result[name], name, actions[name]);

  // Pass IV: 9-10; Resolve, Freeze
  for (var name in result) 
    result[name] = resolve(result, name, actions[name]);

  return result;
}

Object.defineProperties(module, {
  exports: { value: transform }
});