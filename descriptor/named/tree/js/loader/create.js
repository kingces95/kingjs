'use strict';

var objectEx = require('@kingjs/object-ex');
var schema = require('./schema');
var builtIn = require('./built-in');

var Extendable = 'Extendable';
var Loader = schema.Loader;

function create(children) {
  var loader = new Loader();

  objectEx.defineField(
    loader, 
    'children', 
    Object.create(builtIn.children)
  );

  objectEx.defineField(loader, Extendable, 
    loader.addClass(Extendable, { 
      base: loader.Object 
    })
  );

  if (children)
    loader.addChildren(children);

  return loader;
}

Object.defineProperties(module, {
  exports: { value: create }
});