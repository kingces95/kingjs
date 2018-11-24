'use strict';

var createHelper = require('@kingjs/descriptor.create');
var map = require('@kingjs/descriptor.map');

var reduceAction = require('./js/reduceAction');
var createActions = require('./js/createActions');

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

    // Pass III: 5-8; Inflate, Thunks, Scorch, Update
    result[name] = map.call(descriptor, action, name);
  }

  return result;
}

Object.defineProperties(module, {
  exports: { value: create }
});