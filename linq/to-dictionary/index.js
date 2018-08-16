'use strict';

var aggregate = require('@kingjs/linq.aggregate');
var Dictionary = require('@kingjs/dictionary');

function toDictionary(keySelector, valueSelector) {      
  return aggregate.call(this, new Dictionary(), function(a, o) { 
    var key = keySelector(o);
    if (key in o)
      throw "toDictionary: key already exists: " + key;
    
    var value = o;
    if (valueSelector)
      value = valueSelector(o);
    
    a[key] = value;
    return a;
  });
};

Object.defineProperties(module, {
  exports: { value: toDictionary }
});