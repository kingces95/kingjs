'use strict';
var assert = require('assert');
var is = require('@kingjs/is');

function normalizeName(target, name, descriptor) {

  // normalize name
  if (!is.stringOrSymbol(name))
    name = (descriptor.value || descriptor.get || descriptor.set).name;

  // map name
  var map = descriptor.map;
  if (map) {
    assert(name in map);
    name = map[name];
  }

  return { target, name, descriptor };
}

module.exports = normalizeName;
