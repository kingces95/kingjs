'use strict';

var makeEnumerable = require('@kingjs/array.make-enumerable');
var Dictionary = require('@kingjs/dictionary');

function toLookup(keySelector, valueSelector) {       
  var lookup = new Dictionary();
  
  var enumerator = this.getEnumerator();  
  while (enumerator.moveNext()) {
    var current = enumerator.current;
    
    var value = current;
    if (valueSelector)
      value = valueSelector(current);
    
    var key = keySelector(current);
    var values = lookup[key];
    if (!values) {
      var values = makeEnumerable.call([]);
      lookup[key] = values;
      values.key = key;
    }
    
    values.push(value);
  }
  
  return lookup;
};

Object.defineProperties(module, {
  exports: { value: toLookup }
});