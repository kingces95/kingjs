'use strict';

var createHelper = require('@kingjs/descriptor.create');
var map = require('@kingjs/descriptor.map');
var load = require('@kingjs/descriptor.named.load');

var normalizeAction = require('./js/normalizeAction');
var createActions = require('./js/createActions');

function mapAndResolve(descriptor, name) {
  var action = this[name];

  // Pass III: 5-8; Inflate, Thunks, Scorch, Update
  return map.call(descriptor, action, name);
}

function getDepends(name) {
  return this.depends ? this.depends[name] : null;
}

function getRefs(name) {
  return this.refs ? this.refs[name] : null;
}

function create(descriptors, action) {
  var result = { };
  
  // Pass I: 1-3; Wrap, Inherit, Defaults
  action = normalizeAction(action);
  var actions = createActions(descriptors, action);
  var descriptors = actions.$descriptors || descriptors;
  for (var name in actions) {
    var action = actions[name];
    var descriptor = descriptors[name] || descriptors[action.encodedName];
    result[name] = createHelper(descriptor, action);
  }

  // Pass II: 4; Depends
  result = load.call(result, mapAndResolve, getDepends, actions); // depends
  
  // Pass IV: 9-10; Resolve, Freeze
  result = load.call(result, null, getRefs, actions); // refs

  return result;
}

Object.defineProperties(module, {
  exports: { value: create }
});