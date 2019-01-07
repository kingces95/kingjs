'use strict';

var {
  '@kingjs/generator': Generator,
  '@kingjs/object-ex': objectEx,
} = require('@kingjs/require-packages').call(module);

var { 
  Implement,
  IInterface: { Id },
  IEnumerable, IEnumerable: { 
    GetEnumerator,
  },
  IEnumerator, IEnumerator: { 
    [Id]: IEnumeratorId,
    MoveNext,
    Current,
  },
  IIterable, IIterable: { 
    GetIterator,
  }
} = Symbol.kingjs;

Generator[Implement](IIterable, {
  GetIterator: function getIterator() { return this(); }
});

function createGetEnumerator(createMoveNext) {
  var result;

  var Enumerable = function() { };
  Enumerable[Implement](IEnumerable, {
    GetEnumerator: result = function getEnumerator() {
      var thisArg = this;
      var stillMoving = true;
      var moveNextFunc = null;
  
      return Object.defineProperties(new Enumerable(), {
        [IEnumeratorId]: IEnumerator,
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
  });

  return result;
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

Generator[Implement](IEnumerable);