'use strict';

var makeEnumerable = require('@kingjs/array.make-enumerable');
var defineGenerator = require('@kingjs/define-generator');
var Dictionary = require('@kingjs/dictionary');

function defaultSelector(x) {
  return x;
}

function groupBy(
  keySelector,
  elementSelector,
  resultSelector) {

  if (!elementSelector)
    elementSelector = defaultSelector;

  if (!resultSelector)
    resultSelector = defaultSelector;

  var enumerator = this.getEnumerator();  
  var groupsEnumerator;
  
  return function() {
    
    if (enumerator) {
      var groups = makeEnumerable.call([]);
      
      var groupByKey = new Dictionary();
      
      while (enumerator.moveNext()) {
        var current = enumerator.current;         
        var key = keySelector(current);
        
        var group = groupByKey[key];
        if (!group) {
          group = makeEnumerable.call([]);
          group.key = key;
          groupByKey[key] = group;
          groups.push(group);
        }
        
        group.push(elementSelector(current))
      }

      groupsEnumerator = groups.getEnumerator();
      enumerator = undefined;
    }
    
    if (!groupsEnumerator.moveNext())
      return false;
    
    var current = groupsEnumerator.current;
    this.current_ = resultSelector(current);
    return true;
  }
};

Object.defineProperties(module, {
  exports: { value: defineGenerator(groupBy) }
});