'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');
var filter = require('@kingjs/descriptor.filter');
var write = require('@kingjs/descriptor.write');

var nestedArray = {
  reduce: require('@kingjs/descriptor.nested.array.reduce')
}

var normalizeAction = require('./normalizeAction');

var hidden = { enumerable: false };

var descriptorActionFilter = {
  $scorch: 'scorch',
  $freeze: 'freeze',
  $defaults: 'defaults',
  $bases: 'bases',
  $wrap: 'wrap',
  $thunks: 'thunks',
  $depends: 'depends',
  $refs: 'refs'
};

function createManyActions(manyActions, descriptors) {
  var action = this;
  var actions = createActions(descriptors, action);
  
  for (var name in actions) {
    var action = actions[name];
    assert(name in manyActions == false);
    manyActions[name] = action;
    manyActions.$descriptors[name] = descriptors[name];
}

  return manyActions;
}

function createActions(descriptors, action) {
  var actions = { };

  // flatten
  if (is.array(descriptors)) {

    // optimization; gather nested descriptors while gathering actions
    actions.$descriptors = { };
    Object.defineProperty(actions, '$descriptors', hidden);

    return nestedArray.reduce(
      descriptors, 
      createManyActions, 
      actions, 
      action
    );
  }

  // merge family actions
  var filteredAction = filter.call(descriptors, descriptorActionFilter);
  if (filteredAction)
    action = normalizeAction([filteredAction, action]);

  // accumulate decoded family members
  for (var name in descriptors) {

    // filter out family specific action metadata
    if (name[0] == '$')
      continue;

    // decode name
    if (name.indexOf('$') != -1) {
      action = write.call(action, 'encodedName', name);

      var split = name.split('$');
      name = split.shift();
      action = write.call(action, 'baseNames', split);
    }

    // accumulate
    actions[name] = action;
  }

  return actions;
}

Object.defineProperties(module, {
  exports: { value: createActions }
});