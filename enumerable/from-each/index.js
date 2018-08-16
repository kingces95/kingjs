'use strict';

var Odometer = require('@kingjs/odometer');
var defineGenerator = require('@kingjs/define-generator');
var emptyObject = { };

function fromEach(data) {

  if (!data)
    data = emptyObject;

  var keys = Object.keys(data)
  var odometer = new Odometer(
    keys.map(
      function(key) { 
        return data[key].length; 
      }
    )
  ).getEnumerator();

  var dataIsArray = data instanceof Array;

  return function() {
    if (!odometer.moveNext())
      return false;
      
    var keyIndex = 0; // todo: move into odometer
    var current = dataIsArray ? [ ] : { };
    
    odometer.current.forEach(function(i) {
      var key = keys[keyIndex++];
      var array = data[key];
      current[key] = array[i]; 
    });
    
    this.current_ = current;
    return true;
  }
}

Object.defineProperties(module, {
  exports: { value: defineGenerator(fromEach) }
});