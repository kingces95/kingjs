'use strict';

var assert = require('assert');
var defineInterface = require('..');

function readMe() {
  var target = { };

  var IFoo = defineInterface(target, 'IFoo', {
    id: Symbol.for('@kingjs/IFoo'),
    members: { 
      foo: Symbol.for('IFoo (custom)'),
      baz: null,
      iterator: Symbol.iterator
    }
  });

  var IBar = defineInterface(target, 'IBar', {
    members: { bar: null },
    extends: [ IFoo ]
  });

  assert(target.IFoo == IFoo);
  assert(target.IBar == IBar);
  
  assert.throws(IFoo);
  assert.throws(IBar);

  assert(IFoo.prototype === null);
  assert(IBar.prototype === null);

  assert(Symbol.keyFor(IFoo.baz) == '@kingjs/IFoo.baz');
  assert(Symbol.keyFor(IFoo.foo) == 'IFoo (custom)');
  assert(Symbol.keyFor(IBar.bar) == 'IBar.bar');

  var Identity = Symbol.for('@kingjs/identity');
  assert(Symbol.keyFor(IFoo[Identity]) == '@kingjs/IFoo');
  assert(Symbol.keyFor(IBar[Identity]) == 'IBar');

  assert(IFoo.name == '@kingjs/IFoo');
  assert(IBar.name == 'IBar');

  var Polymorphism = Symbol.for('@kingjs/polymorphisms');
  assert(Object.getOwnPropertySymbols(IFoo[Polymorphism]).length == 1);
  assert(IFoo[Identity] in IFoo[Polymorphism]);

  assert(Object.getOwnPropertySymbols(IBar[Polymorphism]).length == 2);
  assert(IFoo[Identity] in IBar[Polymorphism]);
  assert(IBar[Identity] in IBar[Polymorphism]);

  assert(IFoo[Symbol.hasInstance] == require('@kingjs/has-instance'));

  function FooBar() { }
  FooBar.prototype[IFoo.foo] = 'foo';
  FooBar.prototype[IFoo.baz] = 'baz';
  FooBar.prototype[IBar.bar] = 'bar';
  FooBar[Polymorphism] = {
    [IFoo[Identity]]: IFoo,
    [IBar[Identity]]: IBar,
  }

  var fooBar = new FooBar();
  assert(fooBar instanceof IFoo);
  assert(fooBar instanceof IBar);
}
readMe();