'use strict';

var createInterface = require('.');
var hasInstance = require('@kingjs/has-instance');

var IIdentifiable = require('@kingjs/i-identifiable');
var IPolymorphic = require('@kingjs/i-polymorphic');
var IEnumerable = require('@kingjs/i-enumerable');
var IEnumerator = require('@kingjs/i-enumerator');

var { getEnumerator } = IEnumerable;
var { moveNext, current } = IEnumerator;

var testRequire = require('..');
var assert = testRequire('@kingjs/assert')
var assertThrows = testRequire('@kingjs/assert-throws')
var objectEx = testRequire('@kingjs/object-ex');
var Generator = testRequire('@kingjs/generator');

testRequire('@kingjs/shim.generator-iterator');

var identityId = IIdentifiable.identity;
var polymorphismsId = IPolymorphic.polymorphisms;

Object.defineProperty(
  Function.prototype,
  Symbol('getPolymorphisms'), {
    value: function() { return { }; }
  }
)

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

function addPolymorphism(polymorphism) {
  assert(typeof this == 'function');
  assert(typeof polymorphism == 'function');

  var polymorphisms = this[polymorphismsId];
  if (!polymorphisms)
    this[polymorphismsId] = polymorphisms = Object.create(null);

  polymorphisms[polymorphism[identityId]] = polymorphism;
}

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

function testBootstrap() {
  var addPolymorphismId;
  var defineExtensionId;
  
  // make Function IPolymorphic (bootstrap)
  addPolymorphism.call(Function, IPolymorphic);
  assert((function() { }) instanceof IPolymorphic);

  // extend IPolymorphic with defineExtension (bootstrap)
  defineExtensionId = defineExtension.call(
    IPolymorphic, 
    defineExtension.name, 
    defineExtension
  );

  // extend IPolymorphic with addPolymorphism
  addPolymorphismId = IPolymorphic[defineExtensionId](
    addPolymorphism.name, 
    addPolymorphism
  )

  // make Function IIdentifiable
  Function[addPolymorphismId](IIdentifiable);

  // make IIterable to facilitate interop with Symbol.iterator
  var IIterable = createInterface('IIterable', {
    members: { getIterable: Symbol.iterator },
    extends: [ IEnumerable ]
  });

  // make Generator, Array, String IIterable
  Generator[addPolymorphismId](IIterable);
  Array[addPolymorphismId](IIterable);
  String[addPolymorphismId](IIterable);

  var gen = function* myGenerator() {
    yield 0;
    yield 1;
    yield 2;
  };
  var array = [0, 1, 2];
  var string = '012';

  assert(gen instanceof IIterable);
  assert(array instanceof IIterable);
  assert(string instanceof IIterable);

  // demonstrate iterop; use Symbol.iterator implementation via IIterable
  var countId = IIterable[defineExtensionId]('count', function() {
    var iterator = this[IIterable.getIterable]();
    var result = 0;

    var next;
    while (next = iterator.next(), !next.done)
      result++;

    return result;
  });

  assert(gen[countId]() == 3);
  assert(string[countId]() == 3);
  assert(array[countId]() == 3);

  // check stub throws if instance is not IIterable
  assertThrows(() => ({ })[countId]());
}
testBootstrap();
