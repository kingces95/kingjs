'use strict';

var createInterface = require('.');
var hasInstance = require('@kingjs/has-instance');

var IIdentifiable = require('@kingjs/i-identifiable');
var IPolymorphic = require('@kingjs/i-polymorphic');
var IEnumerable = require('@kingjs/i-enumerable');
var IEnumerator = require('@kingjs/i-enumerator');

var { getEnumerator } = IEnumerable;
var { moveNext, current } = IEnumerator;

var assert = require('@kingjs/assert')
var assertThrows = require('@kingjs/assert-throws')
var objectEx = require('@kingjs/object-ex');
var Generator = require('@kingjs/generator');

require('@kingjs/shim.generator-iterator');

var { identity: identityId } = IIdentifiable;
var { polymorphisms: polymorphismsId } = IPolymorphic;

function readMe() {
  var IFoo = createInterface('IFoo', {
    members: { foo: Symbol('IFoo (custom)') }
  });

  var IBar = createInterface('IBar', {
    members: { bar: null },
    extends: [ IFoo ]
  });
  
  assert(Object.getOwnPropertySymbols(IFoo[polymorphismsId]).length == 1);
  assert(IFoo[identityId] in IFoo[polymorphismsId]);

  assert(Object.getOwnPropertySymbols(IBar[polymorphismsId]).length == 2);
  assert(IFoo[identityId] in IBar[polymorphismsId]);
  assert(IBar[identityId] in IBar[polymorphismsId]);

  function FooBar() { }
  FooBar.prototype[IFoo.foo] = 'foo';
  FooBar.prototype[IBar.bar] = 'bar';
  FooBar[polymorphismsId] = {
    [IFoo[identityId]]: IFoo,
    [IBar[identityId]]: IBar,
  }

  assert(IFoo[Symbol.hasInstance] == hasInstance);

  var fooBar = new FooBar();
  assert(fooBar instanceof IFoo);
  assert(fooBar instanceof IBar);
}
readMe();
  
// defineExtension(this IPolymorphic, name: string, extension: function)
var defineExtensionId = (function bootstrap() {
  function defineExtension(name, extension) {
    assert(typeof this == 'function');
    assert(typeof extension == 'function');
  
    objectEx.defineField(extension, 'name', name);
  
    assert(!(identityId in extension));
    var id = extension[identityId] = Symbol(name);
  
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
var addPolymorphismId = (function bootstrap() {
  function addPolymorphism(polymorphism) {
    assert(typeof this == 'function');
    assert(typeof polymorphism == 'function');
  
    var polymorphisms = this[polymorphismsId];
    if (!polymorphisms)
      this[polymorphismsId] = polymorphisms = Object.create(null);
  
    polymorphisms[polymorphism[identityId]] = polymorphism;
  }
  
  // make Function IPolymorphic (bootstrap)
  addPolymorphism.call(Function, IPolymorphic);
  assert((function() { }) instanceof IPolymorphic);

 return IPolymorphic[defineExtensionId](
    addPolymorphism.name, 
    addPolymorphism
  )
})();

// make Function IIdentifiable
Function[addPolymorphismId](IIdentifiable);

function testIIterableShim() {

  // IIterable <-> Symbol.iterator
  var IIterable = createInterface('IIterable', {
    members: { getIterable: Symbol.iterator },
    extends: [ IEnumerable ]
  });

  // shim Generator, Array, String IIterable
  Generator[addPolymorphismId](IIterable);
  Array[addPolymorphismId](IIterable);
  String[addPolymorphismId](IIterable);

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
  var countId = IIterable[defineExtensionId]('count', function() {
    var iterator = this[IIterable.getIterable]();
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
  assertThrows(() => ({ })[countId]());
}
testIIterableShim();

function createGetEnumerator(createMoveNext) {
  return function getEnumerator() {
    var thisArg = this;
    var stillMoving = true;
    var moveNextFunc = null;

    return Object.defineProperties({ }, {
      [current]: {
        get: function current() { return this.current_; }
      },

      [moveNext]: {
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

function shimGeneratorEnumerator() {

  objectEx.defineProperty(
    Generator.prototype,
    getEnumerator, {
      value: createGetEnumerator(
        
        function createMoveNext() {
          var generator = this;
          var iterator = null;

          return function moveNext() {
            if (!iterator) {
              var iterable = generator();
              iterator = iterable[Symbol.iterator]();
            }
            var next = iterator.next();
            this.current_ = next.value;
            return !next.done;
          };
        }
      )
    }
  )

  {
    function* range3() {
      yield 0;
      yield 1;
      yield 2;
    };

    var test = range(3);
    var x = test[Symbol.iterator]();
    var next0 = x.next();
    var next1 = x.next();
    var next2 = x.next();
    var next3 = x.next();
  }

  function* range(count) {
    for (var i = 0; i < count; i ++)
      yield i;
  }

  var count = 3;
  var generator = range.bind(null, count);
  var enumerator = generator[getEnumerator]();

  var i = 0;
  while (enumerator[moveNext]())
    assert(enumerator[current] == i++);
  assert(i == count);
}
shimGeneratorEnumerator();