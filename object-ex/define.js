'use strict';
var initialize = require('./initialize');
var mapName = require('./map-name');

function define(target, name, descriptor) {
  var value = Object.defineProperty(create(descriptor), 'name', { value: name });
  return Object.defineProperty(target, name, { value });
}

function create(descriptor) {
  let { defaults, normalizer } = descriptor;
  return function() {

    // normalize arguments
    let { target, name, descriptor } = normalizer(...arguments);

    // assign defaults
    for (var key in defaults) {
      if (key in descriptor == false)
        descriptor[key] = defaults[key];
    }

    // map name
    name = mapName.call(descriptor, name);

    // initialize descriptor (add stubs, special sauce, etc)
    initialize.call(descriptor, name, target);

    // define property
    return Object.defineProperty(target, name, descriptor);
  }
}

module.exports = define;