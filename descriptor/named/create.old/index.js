'use strict';

var createHelper = require('@kingjs/descriptor.create');
var map = require('@kingjs/descriptor.map');
var load = require('@kingjs/descriptor.named.load');

var reduceAction = require('./js/reduceAction');
var createActions = require('./js/createActions');

function mapAndResolve(descriptor, name) {
  var action = this[name];

  // Pass III: 5-8; Inflate, Thunks, Scorch, Update
  return map.call(descriptor, action, name);
}

function getDepends(name) {
  return this[name].depends;
}

function getRefs(name) {
  return this[name].refs;
}

function create(descriptors, action) {
  var result = { };
  
  // Pass I: 1-3; Wrap, Inherit, Defaults
  action = reduceAction(action);
  var actions = createActions(descriptors, action);
  var descriptors = actions.$descriptors || descriptors;
  for (var name in actions) {
    var action = actions[name];

    var descriptor = descriptors[name];
    if (descriptor === undefined) 
      descriptor = descriptors[action.$encodedName];
      
    result[name] = createHelper(descriptor, action);
  }

  // Pass II: 4-8; Depends, Inflate, Thunk, Scorch, Update
  result = load.call(result, mapAndResolve, getDepends, actions);
  
  // Pass IV: 9; Resolve
  result = load.call(result, null, getRefs, actions);

  return result;
}

Object.defineProperties(module, {
  exports: { value: create }
});