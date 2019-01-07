'use strict';

var {
  '@kingjs/generator': Generator,
  '@kingjs/object-ex': objectEx,
} = require('@kingjs/require-packages').call(module);

var DefineInterfaceOn = require('./define-interface-on');

var { 
  IEnumerable, 
  IEnumerator,
} = Symbol.kingjs;

function defineIEnumerableOn(target, createMoveNext) {

  IEnumerable[DefineInterfaceOn](target, {
    GetEnumerator: function getEnumerator() {
      var thisArg = this;
      var stillMoving = true;
      var moveNextFunc = null;
  
      return IEnumerator[DefineInterfaceOn]({ }, {
        Current: {
          get: function current() { return this.current_; }
        },
  
        MoveNext: {
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