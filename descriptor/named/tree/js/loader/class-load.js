//'use strict';

var assert = require('@kingjs/assert');
var defineClass = require('../define-class');
var objectEx = require('@kingjs/object-ex');

function load() {

  if (this.func)
    return this.func;

  // load base
  var base = this.base;
  var baseFunc = base.load();

  // create this function using base function
  var name = this.name;
  var func = defineClass(name, baseFunc, this.init);
  objectEx.defineConstField(this, name, func);

  // fulfill promised registration of extensions with their interfaces
  var promisedExtensions = this.loader.promisedExtensions;
  while (promisedExtensions.length) {
    var extension = promisedExtensions.pop();
    var interface = extension.extends;
    assert(interface.isInterface);
    interface.track(extension);
  }

  // register ourself with interfaces to receive our extensions
  var implements = this.implements;
  if (implements) {
    for (var i = 0; i < implements.length; i++)
      implements[i].track(this);
  }

  return func;
}

Object.defineProperties(module, {
  exports: { value: load }
});