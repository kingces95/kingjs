'use strict';

var odometer = require('@kingjs/enumerable.odometer');
var define = require('@kingjs/enumerable.define');
var emptyObject = { };

function fromEach(data) {

  if (!data)
    data = emptyObject;

  // todo: cache on Enumerable
  var keys = undefined;
  var dataIsArray = undefined;

  var enumerator = undefined;

  return function() {
    if (!enumerator) {
      keys = Object.keys(data)
      enumerator = odometer(
        keys.map(
          function(key) { 
            return data[key].length; 
          }
        )
      ).getEnumerator();
      dataIsArray = data instanceof Array;
    }

    if (!enumerator.moveNext())
      return false;
      
    var current = dataIsArray ? [ ] : { };
    
    enumerator.current.forEach(function(arrayIndex, keyIndex) {
      var key = keys[keyIndex];
      var array = data[key];
      current[key] = array[arrayIndex]; 
    });
    
    this.current_ = current;
    return true;
  }
}

Object.defineProperties(module, {
  exports: { value: define(fromEach) }
});