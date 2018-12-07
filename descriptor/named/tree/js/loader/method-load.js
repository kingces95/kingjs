//'use strict';

var assert = require('@kingjs/assert');

function load() {
  var interface = this.extends;
  if (interface) {
    assert(interface.isInterface);
    assert(!this.parent.declaringType);

    interface.track(this);
  }
}

Object.defineProperties(module, {
  exports: { value: load }
});