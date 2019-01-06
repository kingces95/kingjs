'use strict';

var {
  '@kingjs/generator': Generator,
  '@kingjs/object-ex': objectEx,
} = require('@kingjs/require-packages').call(module);

var { 
  AddPolymorphism,
  IIterable,
  IEnumerable,
  IEnumerator,
  IIterable: { GetIterator },
  IEnumerable: { GetEnumerator },
  IEnumerator: { Current, MoveNext },
} = Symbol.kingjs;

Generator[AddPolymorphism](IIterable);

Object.defineProperty(
  Generator.prototype,
  Symbol.iterator, {
    configurable: true,
    writable: true,
    value: function() { return this(); },
  }
)

function createGetEnumerator(createMoveNext) {
  var Enumerator = function() { };
  Enumerator[AddPolymorphism](IEnumerator);

  return function getEnumerator() {
    var thisArg = this;
    var stillMoving = true;
    var moveNextFunc = null;

    return Object.defineProperties(new Enumerator(), {
      [Current]: {
        get: function current() { return this.current_; }
      },

      [MoveNext]: {
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
}

objectEx.defineProperty(
  Generator.prototype,
  GetEnumerator, {
    value: createGetEnumerator(

      function createMoveNext() {
        var generator = this;
        var iterator = null;

        return function moveNext() {
          if (!iterator) {
            var iterable = generator();
            iterator = iterable[GetIterator]();
          }
          var next = iterator.next();
          this.current_ = next.value;
          return !next.done;
        };
      }
    )
  }
)

Generator[AddPolymorphism](IEnumerable);