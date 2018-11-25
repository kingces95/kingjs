'use strict';

var assert = require('@kingjs/assert');
var Node = require('../node');
var defineSchema = require('../define-schema');
var schema = require('./schema');

function create() {
  var loader = new Loader();

  loader.addChildren({
    packages: { 
      'system': system
    }
  });

  return loader;
}

Object.defineProperties(module, {
  exports: { value: create }
});