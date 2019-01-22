'use strict';
var initialize = require('./initialize');
var mapName = require('./map-name');

function define(target, name, descriptor) {

  // define function, set it's name, and export to target
  return Object.defineProperty(target, name, { 
    value: Object.defineProperty(
      create(descriptor), 
      'name', 
      { value: name }
    )
  });
}

function defaultNormalizer(target, name, descriptor) {
  assert(is.stringOrSymbol(name));
  descriptor = { ...descriptor };
  return { target, name, descriptor };
}

function create(descriptor) {
  let { 
    defaults, 
    normalizer 
  } = descriptor;

  if (!normalizer)
    normalizer = defaultNormalizer;

  return function() {

    // normalize arguments
    let { target, name, descriptor } = normalizer(...arguments);

    // assign defaults
    descriptor = { ...defaults, ...descriptor };

    // map name
    name = mapName.call(descriptor, name);

    // initialize descriptor (add stubs, special sauce, etc)
    initialize.call(descriptor, name, target);

    // define property
    return Object.defineProperty(target, name, descriptor);
  }
}

module.exports = define;