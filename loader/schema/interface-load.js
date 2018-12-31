//'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');
var objectEx = require('@kingjs/object-ex');

var interfaceActivationError = 'Cannot create interface type.';

function load() {

  // interface throws if activated
  var func = function() {
    assert(false, interfaceActivationError)
  };

  // interface has no prototype because it's never activated
  func.prototype = null;

  // set interface name
  objectEx.defineConstField(func, 'name', this.name);

  // support instanceOf via Type.hasInstance
  objectEx.defineFunction(func, Symbol.hasInstance, 
    instance => this.hasInstance(instance)
  )

  // allow func -> info resolution
  var { id: info } = this.loader.resolve('IReflectable.info');
  objectEx.defineHiddenStaticField(func, info, this);

  // map interface member to its id (ala Symbol.hasInstance)
  for (var name in this.children) {
    var child = this.children[name];
    if (!child.isProcedural)
      continue;

    objectEx.defineConstField(func, name, child.id);
  }

  return func;
}

Object.defineProperties(module, {
  exports: { value: load }
});