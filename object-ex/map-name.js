'use strict';
var assert = require('assert');

function mapName(name) {
  var map = this.map;
  
  if (map) {
    assert(name in map);
    name = map[name];
  }

  return name;
}

module.exports = mapName;
