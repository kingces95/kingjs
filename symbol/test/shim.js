'use strict';

var assert = require('assert')

var symbol = require('..');
var objectEx = require('@kingjs/object-ex');
var Generator = require('@kingjs/generator');

require('@kingjs/shim.generator-iterator');

var {
  IIterable,
  IEnumerable,
  IEnumerator,
  IPolymorphic,
  IIdentifiable,
} = symbol;

var {
  IIterable: { GetIterator },
  IIdentifiable: { Identity },
  IPolymorphic: { Polymorphisms },
  IEnumerable: { GetEnumerator },
  IEnumerator: { MoveNext, Current },
} = symbol;

// defineExtension(this IPolymorphic, name: string, extension: function)
var DefineExtension = (function bootstrap() {
  function defineExtension(name, extension) {
    assert(typeof this == 'function');
    assert(typeof extension == 'function');

    objectEx.defineField(extension, 'name', name);

    assert(!(Identity in extension));
    var id = extension[Identity] = Symbol(name);

    var descriptor = {
      extends: () => this,
      value: extension
    };

    objectEx.defineFunction(Object.prototype, id, descriptor);

    return id;
  }

  // extend IPolymorphic with defineExtension (bootstrap)
  return defineExtension.call(
    IPolymorphic,
    defineExtension.name,
    defineExtension
  );
})();

// addPolymorphism(this IPolymorphic, polymorphism: function)
var AddPolymorphism = (function bootstrap() {
  function addPolymorphism(polymorphism) {
    assert(typeof this == 'function');
    assert(typeof polymorphism == 'function');
    //assert(polymorphism instanceof IIdentifiable);

    var polymorphisms = this[Polymorphisms];
    if (!polymorphisms)
      this[Polymorphisms] = polymorphisms = Object.create(null);

    polymorphisms[polymorphism[Identity]] = polymorphism;
  }

  // make Function IPolymorphic (bootstrap)
  addPolymorphism.call(Function, IPolymorphic);
  assert((function () { }) instanceof IPolymorphic);

  return IPolymorphic[DefineExtension](
    addPolymorphism.name,
    addPolymorphism
  )
})();

// shim Generator, Array, String IIterable
Generator[AddPolymorphism](IIterable);
Array[AddPolymorphism](IIterable);
String[AddPolymorphism](IIterable);

function testIIterableShim() {
  var repeat = function* (i) {
    yield i;
    yield i;
    yield i;
  };
  var array = [0, 1, 2];
  var string = '012';

  var boundRepeat = repeat.bind(null, 1);
  assert(boundRepeat instanceof IIterable);
  assert(repeat instanceof IIterable);
  assert(array instanceof IIterable);
  assert(string instanceof IIterable);

  // demonstrate iterop! Use Symbol.iterator implementation via IIterable
  var countId = IIterable[DefineExtension]('count', function () {
    var iterator = this[GetIterator]();
    var result = 0;

    var next;
    while (next = iterator.next(), !next.done)
      result++;

    return result;
  });

  assert(repeat[countId]() == 3);
  assert(string[countId]() == 3);
  assert(array[countId]() == 3);

  // check stub throws if instance is not IIterable
  assert.throws(() => ({})[countId]());
}
testIIterableShim();

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

function testGeneratorEnumerableShim() {
  {
    function* range3() {
      yield 0;
      yield 1;
      yield 2;
    };

    var test = range(3);
    var x = test[GetIterator]();
    var next0 = x.next();
    var next1 = x.next();
    var next2 = x.next();
    var next3 = x.next();
  }

  function* range(count) {
    for (var i = 0; i < count; i++)
      yield i;
  }

  assert(range instanceof IEnumerable);

  var count = 3;
  var generator = range.bind(null, count);
  var enumerator = generator[GetEnumerator]();

  assert(enumerator instanceof IEnumerator);

  var i = 0;
  while (enumerator[MoveNext]())
    assert(enumerator[Current] == i++);
  assert(i == count);
}
testGeneratorEnumerableShim();