'use strict';

var {
  '@kingjs/generator': Generator,
  '@kingjs/object-ex': objectEx,
} = require('@kingjs/require-packages').call(module);

var { 
  DefineInterfaceOn,
  IInterface: { Id },
  IEnumerable, IEnumerable: { 
    [Id]: IEnumerableId,
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

IIterable[DefineInterfaceOn](Generator.prototype, {
  GetIterator: function getIterator() { return this(); }
});

function createGetEnumerator(createMoveNext) {
  return function getEnumerator() {
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

IEnumerable[DefineInterfaceOn](Generator.prototype);