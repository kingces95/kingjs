'use strict';

var aggregate = require('@kingjs/linq.aggregate');
var Dictionary = require('@kingjs/dictionary');

/**
 * @description Creates a dictionary from a sequence where the 
 * dictionary keys and values are projected from each element.
 * 
 * @param {*} keySelector 
 * @param {*} valueSelector 
 */
function toDictionary(keySelector, valueSelector) {      
  return aggregate.call(this, new Dictionary(), function(x) { 
    var key = keySelector(x);
    if (key in x)
      throw "toDictionary: key already exists: " + key;
    
    var value = x;
    if (valueSelector)
      value = valueSelector(x);
    
    this[key] = value;
    return this;
  });
};

Object.defineProperties(module, {
  exports: { value: toDictionary }
});