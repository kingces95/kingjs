'use strict';
var assert = require('assert');

var {
  IEnumerable,
  IEnumerator,
  IEnumerator: { MoveNext, Current },
  AddPolymorphism
} = Symbol.kingjs;

function Enumerator(enumerable, createMoveNext) {
  assert(enumerable instanceof IEnumerable);
  this.enumerable = enumerable;
  this.createMoveNext = createMoveNext;
}

Enumerator[AddPolymorphism](IEnumerator);

var prototype = Enumerator.prototype;
prototype.stillMoving = true;
prototype.moveNextFunc = null;
prototype.enumerable = undefined;
prototype.createMoveNext = undefined;

Object.defineProperties(Enumerator.prototype, {

  [Current]: {
    enumerable: true,
    get: function current() { return this.current_; }
  },

  [MoveNext]: {
    value: function moveNextProtocol() {
      if (!this.moveNextFunc)
        this.moveNextFunc = this.createMoveNext.call(this.enumerable);

      this.stillMoving = this.stillMoving && this.moveNextFunc.call(this);
      if (!this.stillMoving)
        this.current_ = undefined;

      return this.stillMoving;
    }
  }
})

module.exports = Enumerator;