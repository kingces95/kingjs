'use strict';

var createHelper = require('@kingjs/descriptor.create');
var map = require('@kingjs/descriptor.map');
var depends = require('@kingjs/descriptor.family.load');
var resolve = require('@kingjs/descriptor.family.resolve');

var normalizeAction = require('./normalizeAction');
var createActions = require('./createActions');

function create(action) {
  var result = { };
  
  // Pass I: 1-3; Wrap, Inherit, Defaults
  var actions = createActions(this, normalizeAction(action));
  var descriptors = actions.$descriptors || this;
  for (var name in actions) {
    var action = actions[name];
    var descriptor = descriptors[name] || descriptors[action.encodedName];
    result[name] = createHelper.call(descriptor, action);
  }

  // Pass II: 4; Depends
  depends(result, actions);

  // Pass III: 5-8; Inflate, Thunks, Scorch, Update
  for (var name in result)
    result[name] = map.call(result[name], name, actions[name]);

  // Pass IV: 9-10; Resolve, Freeze
  for (var name in result) 
    result[name] = resolve(result, name, actions[name]);

  return result;
}

Object.defineProperties(module, {
  exports: { value: create }
});