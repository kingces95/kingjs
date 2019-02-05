'use strict';

var createHelper = require('@kingjs/descriptor.create');
var map = require('@kingjs/descriptor.map');
var filter = require('@kingjs/descriptor.filter');

var emptyObject = require('@kingjs/empty-object');
var nestedMerge = require('@kingjs/descriptor.nested.merge');
var nestedArrayReduce = require('@kingjs/descriptor.nested.array.reduce');

var dollarSign = '$';
var undef = undefined;

var takeRight = (x, y) => y;

function composeRight(g, f) {
  return function(x) { return g(f(x)); }
}

var actionMergePaths = {
  wrap: takeRight,
  defaults: { '*': takeRight },
  inflate: { '*': takeRight },
  thunks: { '*': composeRight },
  scorch: { '*': takeRight },
  callback: null,
  freeze: takeRight,
};

var descriptorActionFilter = {
  $scorch: 'scorch',
  $freeze: 'freeze',
  $defaults: 'defaults',
  $wrap: 'wrap',
  $thunks: 'thunks',
};

function reduceActions(action) {
  return nestedArrayReduce(action, accumulateActions) || emptyObject;
}

function accumulateActions(accumulate, action) {
  return nestedMerge(accumulate, action, actionMergePaths);
}

function reduceDescriptors(descriptors, action) {
  return nestedArrayReduce(descriptors, accumulateDescriptors, undef, action);
}

function accumulateDescriptors(accumulate, descriptors) {
  if (!descriptors)
    return accumulate;
    
  var action = filter.call(descriptors, descriptorActionFilter);
  action = action ? accumulateActions(this, action) : this;

  for (var name in descriptors) {
    if (name[0] == dollarSign)
      continue;

    var descriptor = descriptors[name];

    descriptor = createHelper(descriptor, action);

    descriptor = map.call(descriptor, action, name);

    if (!accumulate)
      accumulate = { };
    accumulate[name] = descriptor;
  }

  return accumulate;
}

function create(descriptors, action) {
  action = reduceActions(action);
  return reduceDescriptors(descriptors, action);
}

Object.defineProperties(module, {
  exports: { value: create }
});