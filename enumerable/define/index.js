'use strict';

var IEnumerable = require('@kingjs/i-enumerable');
var IEnumerator = require('@kingjs/i-enumerator');

var { getEnumerator } = IEnumerable;
var { moveNext, current } = IEnumerator;

var currentFieldDescriptor = {
  writable: true
};

var getCurrentDescriptor = {
  enumerable: true,
  get: function () { return this.current_; }
};

function defineEnumerableType(moveNextGenerator) {
  return function Enumerable(thisArg, args) {
    Object.defineProperties(this, {
      [getEnumerator]: {
        value: function getEnumerator() {
          var moveNextFunc = null;
          var stillMoving = true;

          return Object.defineProperties({ }, {
            current_: currentFieldDescriptor,
            [current]: getCurrentDescriptor,
            [moveNext]: {
              value: function() {
                if (!moveNextFunc)
                  moveNextFunc = moveNextGenerator.apply(thisArg, args);

                stillMoving = stillMoving && moveNextFunc.call(this);
                if (!stillMoving)
                  this.current_ = undefined;
                  
                return stillMoving;
              }
            }
          })
        }
      }
    })
  }
}

Object.defineProperties(module, {
  exports: {
    value: function defineGenerator(moveNextGenerator) {
      var Enumerable = defineEnumerableType(moveNextGenerator);
      
      var result = function() {
        return new Enumerable(this, arguments);
      }
      
      Object.defineProperty(result, 'name', { 
        enumerable: true,
        value: moveNextGenerator.name
      });

      return result;
    }
  }
});