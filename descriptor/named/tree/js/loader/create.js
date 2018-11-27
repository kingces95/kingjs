'use strict';

var assert = require('@kingjs/assert');
var Node = require('../node');
var defineSchema = require('../define-schema');
var schema = require('./schema');
var objectEx = require('@kingjs/object-ex');

var Loader = schema.Loader;

function create() {
  var loader = new Loader();

  objectEx.defineField(
    loader, 
    'children', 
    Object.create(Loader.builtIn.children)
  );

  return loader;
}

Object.defineProperties(module, {
  exports: { value: create }
});