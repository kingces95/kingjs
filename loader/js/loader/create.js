'use strict';

var objectEx = require('@kingjs/object-ex');
var Extendable = 'Extendable';

function create(children) {
  var Loader = this.constructor;
  var loader = new Loader();

  objectEx.defineField(
    loader, 
    'children', 
    Object.create(this.children)
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