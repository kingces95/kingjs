var {
  assert, 
  ['@kingjs']: { 
    Dictionary,
    reflect: { is },
    descriptor: { merge },
    func: { returnArg0: takeLeft }
  }
} = module[require('@kingjs-module/dependencies')]();

function wrap(descriptor, action, thisArg) {

  var wrap = is.object(action) ? action.wrap : action;

  // declarative
  if (is.string(wrap)) {
    var dictionary = new Dictionary();
    dictionary[wrap] = descriptor;
    return dictionary;
  }

  // procedural
  if (is.function(wrap))
    return wrap.call(thisArg, descriptor);

  assert(false, 'Unable to create descriptor.');
}

/**
 * @description Creates a descriptor.
 * 
 * @param {*} descriptor The value to create into a descriptor.
 * @param {*} action The name of the property to hold `value` 
 * or a function that accepts `value` and returns a descriptor. 
 * @param {*} thisArg 
 * 
 * @returns Returns `value` if already a descriptor, else a 
 * normalized descriptor for value.
 */
function create(descriptor, action, thisArg) {

  if (is.undefined(descriptor))
    descriptor = new Dictionary();

  // wrap
  if (!is.object(descriptor))
    descriptor = wrap(descriptor, action, thisArg);

  // defaults
  if (is.object(action) && action.defaults) {
    descriptor = merge.call(
      descriptor, 
      action.defaults,
      takeLeft,
      thisArg
    );
  }
  
  Object.freeze(descriptor);

  return descriptor;
}

module.exports = create;