'use strict';

var nested = {
  scorch: require('@kingjs/descriptor.nested.scorch'),
  update: require('@kingjs/descriptor.nested.update'),
}

function inflateThunkScorchUpdate(descriptor, name, action) {

  // 5. Inflate
  if (action.inflate) {
    descriptor = nested.update(
      descriptor, 
      action.inflate, 
      function(value, key, path) {
        if (value instanceof Function == false)
          return value;
        
        if (value.name != '$')
          return value;
      
        return value(this, key, path);    
      },
      name,
    );
  }

  // 6. Thunk
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
      descriptor,
      name
    )
  }

  return descriptor;
}

Object.defineProperties(module, {
  exports: { value: inflateThunkScorchUpdate }
});