'use strict';

var Dictionary = require('@kingjs/dictionary');
var writableSymbol = require('@kingjs/descriptor.object.writable-symbol');

function clone() {

  var result;

  if (this instanceof Array) {
    result = this.slice();
  } 
  
  else {
    var result = new Dictionary();
    for (var name in this)
      result[name] = this[name];
  }

  result[writableSymbol] = undefined;

  return result;
}

Object.defineProperties(module, {
  exports: { value: clone }
});