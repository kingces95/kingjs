'use strict';

var objectEx = require('@kingjs/object-ex');
var schema = require('./schema');
var builtIn = require('./built-in');

var Loader = schema.Loader;

function create(children) {
  var loader = new Loader();

  objectEx.defineField(
    loader, 
    'children', 
    Object.create(builtIn.children)
  );

  if (children)
    loader.addChildren(children);

  return loader;
}

Object.defineProperties(module, {
  exports: { value: create }
});