var apply = require('@kingjs/apply');
var copy = require('@kingjs/mutate.copy');
var inherit = require('@kingjs/mutate.inherit');

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
    if (key[0] != '$')
      continue;

    var value = this[key]
    if (value instanceof Function == false)
      continue;

    this[key] = value.call(name, key);
  }
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

function transform(name, action) {
  if (action === undefined)
    action = returnThis;

  if (action instanceof Function)
    action = { callback: action };

  var baseNames = name.split('$');
  name = baseNames.shift();

  return apply.call(this,
    wrap, [action.wrap],
    shallowClone, null,
    inherit, [bases, baseNames],
    copy, [action.defaults, true],
    inflate, [name],
    replace, [action.thunks, name],
    action.callback, [name]
  )
}

Object.defineProperties(module, {
  exports: { value: transform }
});