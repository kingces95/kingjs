var apply = require('@kingjs/apply');
var copy = require('@kingjs/mutate.copy');
var inherit = require('@kingjs/mutate.inherit');
var scorch = require('@kingjs/mutate.scorch');

function returnThis() {
  return this;
}

function shallowClone() {
  var result = { };
  for (var name in this)
    result[name] = this[name];
  return result;
}

function wrap(keyOrFunction) {

  // noop
  if (keyOrFunction === undefined)
    return this;

  // declarative
  if (typeof keyOrFunction == 'string') {
    var key = keyOrFunction;

    var result = { };
    result[key] = this;
    return result;
  }

  // procedural
  var func = keyOrFunction;
  return func.call(this);
}

function inflate(name) {
  for (var key in this) {
    var func = this[key];

    if (func instanceof Function == false)
      continue;
    
    if (func.name != '$')
      continue;

    this[key] = func(name, key);
  }

  return this; 
}

function replace(thunks, name) {
  if (!thunks)
    return this;

  for (var key in thunks) {
    if (key in this == false)
      continue;

    var thunk = thunks[key];
    var value = this[key];

    this[key] = thunk.call(value, name, key);
  }

  return this; 
}

function resolve(descriptor) {
  return this.map(function(name) { 
    return descriptor[name];
  });
}

function normalizeAction() {
  var action = this;

  // normalize action
  if (action === undefined)
    action = { };
    
  else if (action instanceof Function)
    action = { callback: action };

  // assign default callback
  if (action.callback === undefined)
    action.callback = returnThis;

  return action;
}

function transform(name, action) {
  // assign default name
  if (name === undefined)
    name = '';

  action = normalizeAction.call(action);

  var baseNames = name.split('$');
  name = baseNames.shift();
  var bases = resolve.call(baseNames, action.bases); 

  return apply.call(this,
    wrap, [action.wrap],
    shallowClone, null,
    inherit, [bases],
    copy, [action.defaults, true],
    inflate, [name],
    replace, [action.thunks, name],
    scorch, null,
    action.callback, [name]
  )
}

Object.defineProperties(module, {
  exports: { value: transform }
});