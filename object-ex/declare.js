'use strict';
var assert = require('assert');
var is = require('@kingjs/is');
var initialize = require('./initialize');

var declare = function(defaults, normalize) {
  return function(target, name) {

    // activate descriptor
    var descriptor = Object.create(defaults);

    // normalize descriptor
    normalize.apply(descriptor, arguments);

    // normalize name
    if (!is.stringOrSymbol(name))
      name = (descriptor.value || descriptor.get || descriptor.set).name;

    // map name
    var map = descriptor.map;
    if (map) {
      assert(name in map);
      name = map[name];
    }

    // initialize descriptor (add stubs, special sauce, etc)
    initialize.call(descriptor, name, target);

    // define property
    return Object.defineProperty(target, name, descriptor);
  }
}

module.exports = declare;
