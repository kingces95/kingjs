'use strict';

var assert = require('@kingjs/assert');
var is = require('@kingjs/is');
var objectEx = require('@kingjs/object-ex');
var Node = require('../node');
var schema = require('./schema');

var Interface = schema.Interface;

function defineExtensions(interface) {

}

objectEx.defineFunctions(Interface.prototype, {
  addExtension: function(methodOrAccessor) {

  },
  addImplementation: function(type) {

  }
});

Object.defineProperties(module, {
  exports: { value: create }
});