'use strict';
var initialize = require('./initialize');

var declare = function(defaults, normalize) {
  return function() {

    // normalize arguments
    var { target, name, descriptor } = normalize(...arguments);

    // assign defaults
    for (var key in defaults) {
      if (key in descriptor == false)
        descriptor[key] = defaults[key];
    }

    // initialize descriptor (add stubs, special sauce, etc)
    initialize.call(descriptor, name, target);

    // define property
    return Object.defineProperty(target, name, descriptor);
  }
}

module.exports = declare;
