'use strict';

var assert = require('@kingjs/assert');
var objectEx = require('@kingjs/object-ex');

var dot = '.';

function FullName(segments) {
  assert(segments);

  this.segments = segments;
}

objectEx.defineFunctions(FullName.prototype, {
  equals: function(other) {
    if (this == other)
      return true;

    if (other instanceof FullName == false)
      return false;

    if (other.segments.length != this.segments.length)
      return false;

    for (var i = 0; i < this.segments.length; i++) {
      if (other.segments[i] != this.segments[i])
        return false;
    }
   
    return true;
  }
})

objectEx.defineLazyFunctions(FullName.prototype, {
  toString: function() {
    return this.segments.join(dot);
  }
})

objectEx.defineFunctions(FullName, {
  parse: function(name) {
    var segments = name.split(dot);
  
    for (var i = 0; i < segments.length; i++) {
      if (segments[i].length == 0)
        return undefined;
    }

    return new FullName(segments);
  }
})

Object.defineProperties(module, {
  exports: { value: FullName }
});