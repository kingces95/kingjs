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

  var thunks = action.thunks;
  if (is.function(action))
    thunks = { '*': action };

  // Thunk
  if (thunks) {
    descriptor = nested.update(
      descriptor,
      thunks,
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
  if (action.callback) {
    descriptor = action.callback(
      descriptor,
      name
    )
  }
}

Object.defineProperties(module, {
  exports: { value: map }
});