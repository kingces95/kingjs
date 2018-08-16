'use strict';

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
      getEnumerator: {
        value: function getEnumerator() {
          var moveNext = moveNextGenerator.apply(thisArg, args);
          var stillMoving = true;

          return Object.defineProperties({ }, {
            current_: currentFieldDescriptor,
            current: getCurrentDescriptor,
            moveNext: {
              value: function() {
                stillMoving = stillMoving && moveNext.call(this);
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
    value:
      function defineGenerator(moveNext) {
        var Enumerable = defineEnumerableType(moveNext);
        return function() {
          return new Enumerable(this, arguments);
        }
      }
  }
});