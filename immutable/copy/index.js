var assert = require('@kingjs/assert');

function defaultAction(target, source) {
  return source;
}

function copy(target, source, action) {

  if (action == null || action == undefined)
    action = defaultAction;

  if (action instanceof Function) {
    if (target === undefined)
      return source;
    
    if (source === undefined)
      return target;

    return action(target, source);
  }

  assert(typeof action == 'object');

  assert(
    typeof source == 'object' ||
    source === undefined
  );
  assert(
    typeof target == 'object' ||
    target === undefined
  );

  if (source === undefined)
    return target;

  if (target === undefined)
    target = null;

  var clone = null;
  for (name in action) {

    if (name in source == false)
      continue;

    if (!clone) 
      clone = Object.create(target);

    clone[name] = copy(
      clone[name], 
      source[name], 
      action[name]
    );
  }

  return clone || target;
}

Object.defineProperties(module, {
  exports: { value: copy }
});