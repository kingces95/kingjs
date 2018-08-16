'use strict';

var toArray = require('@kingjs/linq.to-array');
var defaultLessThan = require('@kingjs/linq.default-less-than');

function defaultKeySelector(x) {
  return x;
}

function defineCompare(stack, i) {
  if (stack.length == i)
    return null;

  var keySelector = stack[i++];
  var lessThan = stack[i++];
  var descending = stack[i++];
  var thenBy = defineCompare(stack, i);

  return function(l, r) { 
    
    var x = keySelector(descending ? r : l);
    var y = keySelector(descending ? l : r);
    
    if (lessThan(x, y))
      return -1;
    
    if (lessThan(y, x))
      return 1;
    
    if (!thenBy)
      return 0;
    
    return thenBy(l, r);
  }
}

function orderBy(keySelector, lessThan, descending_, stack_) {
  if (!keySelector)
    keySelector = defaultKeySelector;

  if (!lessThan)
    lessThan = defaultLessThan;

  var source = this;
  var compare = null;
  var stack = null;

  return Object.defineProperties({ }, {
    stack_: { 
      get: function() {
        if (!stack) {
          stack = stack_ ? Object.create(stack_) : [ ];
          stack.push(keySelector, lessThan, descending_);
        }
        return stack;
      } 
    },

    getEnumerator: {
      value : function() {
        var i = 0;
        var sortedArray = null;
        var current = null;
        
        compare = defineCompare(this.stack_, 0);

        return Object.defineProperties({ }, {
          current: { 
            get: function() { return current; } 
          },
          moveNext: { 
            value: function() {

              if (!sortedArray)
                sortedArray = toArray.call(source).sort(compare);
              
              if (i == sortedArray.length) {
                current = undefined;
                return false;
              }
              
              current = sortedArray[i++];
              return true;
            }
          }
        })
      }
    },

    createOrderedEnumerable: {
      value: function(keySelector, lessThan, descending) {
        return orderBy.call(
          this, keySelector, lessThan, descending, this.stack_);
      }
    }
  });
};

Object.defineProperties(module, {
  exports: { value: orderBy }
});