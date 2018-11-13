'use strict';

var is = require('@kingjs/is');
var nested = {
  scorch: require('@kingjs/descriptor.nested.scorch'),
  update: require('@kingjs/descriptor.nested.update'),
}

var defaultAction = { }

function map(action, name) {
  var descriptor = this;

  if (!action)
    action = defaultAction;

  // Inflate
  if (action.inflate) {
    descriptor = nested.update(
      descriptor, 
      action.inflate, 
      function(value, key, path) {
        if (!is.function(value))
          return value;
        
        if (value.name != '$')
          return value;
      
        return value(this, key, path);    
      },
      name,
    );
  }

  // Thunk
  if (action.thunks) {
    descriptor = nested.update(
      descriptor,
      action.thunks,
      function(value, key, callback) {
        return callback(value, this, key);
      },
      name
    );
  }

  // Scorch
  if (action.scorch) {
    descriptor = nested.scorch(
      descriptor, 
      action.scorch
    );
  }

  // Update
  var callback = action.callback || action;
  if (is.function(callback)) {
    descriptor = callback(
      descriptor,
      name
    )
  }

  return descriptor;
}

Object.defineProperties(module, {
  exports: { value: map }
});