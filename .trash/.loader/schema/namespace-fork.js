'use strict';

var objectEx = require('@kingjs/object-ex');
var Extendable = 'Extendable';

function fork(children) {
  var Namespace = this.constructor;
  var namespace = new Namespace();

  // fork children from this namespace to new namespace
  objectEx.defineField(
    namespace, 
    'children', 
    Object.create(this.children)
  );

  // isolate new extensions to new namespace with new Extendable
  objectEx.defineField(namespace, Extendable, 
    namespace.defineClass(Extendable, { 
      base: namespace.resolve(Object)
    })
  );

  if (children)
    namespace.defineChildren(children);

  return namespace;
}

Object.defineProperties(module, {
  exports: { value: fork }
});