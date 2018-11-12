'use strict';

var takeLeft = require('@kingjs/func.return-arg-0');

var normalize = require('@kingjs/descriptor.normalize');
var merge = require('@kingjs/descriptor.merge');
var inherit = require('@kingjs/descriptor.inherit');
var update = require('@kingjs/descriptor.update');

var nested = {
  scorch: require('@kingjs/descriptor.nested.scorch'),
  update: require('@kingjs/descriptor.nested.update'),
}

var normalizeAction = require('./js/normalizeAction');
var resolveAndSelect = require('./js/resolveAndSelect');
var depends = require('./js/depends');
var normalizeDescriptors = require('./js/normalizeDescriptors');

function inflate(value, key, path) {
  if (value instanceof Function == false)
    return value;
  
  if (value.name != '$')
    return value;

  return value(this, key, path);    
}

function replace(name, thunks) {
  return update.call(this, function(value, key) {
    var thunk = thunks[key];
    if (!thunk)
      return value;

    return thunk(this, value, key);
  }, name);
}


function wrapInheritDefaults(descriptor, action) {

  // 1. Wrap
  if (action.wrap)
    descriptor = normalize(descriptor, action.wrap);

  // 2. Inherit
  if (action.baseNames) {
    descriptor = inherit.call(
      descriptor, 
      action.baseNames.map(baseName => action.bases[baseName])
    );
  }

  // 3. Merge
  if (action.defaults) {
    descriptor = merge.call(
      descriptor, 
      action.defaults,
      takeLeft
    );
  }

  return descriptor;
}

function inflateThunkScorchUpdate(descriptor, name, action) {

  // 5. Inflate
  if (action.inflate) {
    descriptor = nested.update(
      descriptor, 
      action.inflate, 
      inflate,
      name,
    );
  }

  // 6. Thunk
  if (action.thunks) {
    descriptor = replace.call(
      descriptor, 
      name,
      action.thunks
    );
  }
  
  // 7. Scorch
  if (action.scorch) {
    descriptor = nested.scorch(
      descriptor, 
      action.scorch
    );
  }

  // 8. Update
  if (action.callback) {
    descriptor = action.callback(
      name,
      descriptor 
    )
  }

  return descriptor;
}

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
  
  // normalize
  var actions = { };
  var result = { };
  action = normalizeAction(action);
  normalizeDescriptors(this, action, result, actions);

  // Pass I: 1-3; Wrap, Inherit, Defaults
  for (var name in result) 
    result[name] = wrapInheritDefaults(result[name], actions[name]);

  // Pass II: 4; Depends
  depends(result, actions);

  // Pass III: 5-8; Inflate, Thunks, Scorch, Update
  for (var name in result)
    result[name] = inflateThunkScorchUpdate(result[name], name, actions[name]);

  // Pass IV: 9; Resolve
  for (var name in result) 
    result[name] = resolve(result, name, actions[name]);

  return result;
}

Object.defineProperties(module, {
  exports: { value: transform }
});