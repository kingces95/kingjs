// 'use strict';
// var assert = require('assert');

// var {
//   '@kingjs/define-interface': defineInterface,
// } = require('@kingjs/require-packages').call(module);

// var { addPolymorphism } = defineInterface;

// var IEnumerableIdentity = Symbol.for('@kingjs/IEnumerable');
// var IEnumeratorIdentity = Symbol.for('@kingjs/IEnumerator');

// var GetEnumerator = Symbol.for('@kingjs/IEnumerable.GetEnumerator');
// var Current = Symbol.for('@kingjs/IEnumerator.Current');
// var MoveNext = Symbol.for('@kingjs/IEnumerator.MoveNext');

// function Enumerator(enumerable, createMoveNext) {
//   assert(enumerable instanceof IEnumerable);

//   var stillMoving = true;
//   var moveNextFunc = null;

//   this[MoveNext] = function moveNextProtocol() {

//     if (!moveNextFunc)
//       moveNextFunc = createMoveNext.call(enumerable);

//     stillMoving = stillMoving && moveNextFunc.call(this);
//     if (!stillMoving)
//       this.current_ = undefined;

//     return stillMoving;
//   }
// }

// Object.defineProperties(
//   Enumerator.prototype, {
//     [Current]: {
//       enumerable: true,
//       get: function current() { return this.current_; }
//     },
//   }
// )

// var IEnumerable = defineInterface(
//   Enumerator, 
//   'IEnumerable', {
//     id: IEnumerableIdentity,
//     members: { GetEnumerator }
//   }
// )

// var IEnumerator = defineInterface(
//   Enumerator, 
//   'IEnumerator', {
//     id: IEnumeratorIdentity,
//     members: { 
//       Current,
//       MoveNext 
//     }
//   }
// )

// addPolymorphism.call(Enumerator, IEnumerator);

// module.exports = Enumerator;