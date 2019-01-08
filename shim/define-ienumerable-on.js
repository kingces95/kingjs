'use strict';

var {
  '@kingjs/generator': Generator,
  '@kingjs/object-ex': objectEx,
  '@kingjs/implement-interface': implementInterface,  
} = require('@kingjs/require-packages').call(module);

var { 
  IEnumerable, 
  IEnumerator,
} = Symbol.kingjs;

function defineIEnumerableOn(target, createMoveNext) {

  implementInterface(target, IEnumerable, {
    GetEnumerator: function getEnumerator() {
      var thisArg = this;
      var stillMoving = true;
      var moveNextFunc = null;
  
      return implementInterface({ }, IEnumerator, {
        current: {
          get: function current() { return this.current_; }
        },
  
        moveNext: {
          value: function moveNextProtocol() {
            if (!moveNextFunc)
              moveNextFunc = createMoveNext.call(thisArg);
  
            stillMoving = stillMoving && moveNextFunc.call(this);
            if (!stillMoving)
              this.current_ = undefined;
  
            return stillMoving;
          }
        }
      })
    }
  });
}

module.exports = defineIEnumerableOn;